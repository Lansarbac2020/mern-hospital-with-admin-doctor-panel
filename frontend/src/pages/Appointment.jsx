import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const {
    doctors,
    currencySymbol,
    getDoctorsData,
    token,
    backendUrl,
  } = useContext(AppContext);

  const { speciality, getAllSpeciality } = useContext(AdminContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [dates, setDates] = useState([]);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Build a mapping from speciality ID to name
  const specialitiesMap = useMemo(() => {
    return Array.isArray(speciality)
      ? speciality.reduce((acc, spec) => {
          acc[spec._id] = spec.name;
          return acc;
        }, {})
      : {};
  }, [speciality]);

  // Fetch specialities on mount
  useEffect(() => {
    getAllSpeciality();
  }, [getAllSpeciality]);

  // Find doctor info from context
  const fetchDocInfo = async () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc || null);
  };

  // Generate next 7 days (including today)
  useEffect(() => {
    const today = new Date();
    const nextSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
    setDates(nextSevenDays);
  }, []);

  // Generate available slots for each of the next 7 days
  const getAvailableSlots = async () => {
    if (!docInfo) return;

    let groupedSlots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // End time = 9 PM
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // Start time
      if (i === 0) {
        // If today is partially over, start from the next half-hour slot
        currentDate.setHours(Math.max(currentDate.getHours(), 10));
        currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 30 : 0);
      } else {
        // For future days, start from 10 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      let daySlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        // Construct slotDate for comparison
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}-${month}-${year}`;

        // Check if slot is already booked
        const isBooked =
          docInfo.slots_booked[slotDate]?.includes(formattedTime) || false;

        if (!isBooked) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      groupedSlots.push(daySlots);
    }
    setDocSlots(groupedSlots);
  };

  // Book an appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Please login to book an appointment');
      return navigate('/login');
    }

    try {
      // If user hasn't selected a slot time, show a warning
      if (!slotTime) {
        toast.warning('Please select a slot time before booking');
        return;
      }

      // Construct the date from the chosen slotIndex
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}-${month}-${year}`;

      // Make the booking request
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointment');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch doc info once doctors are available or docId changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Generate slots whenever docInfo is updated
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) {
    return (
      <div className="py-8 text-center text-gray-600">
        <p>Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Doctor Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-white rounded-lg shadow-sm p-6">
        {/* Left: Doctor Image */}
        <div className="flex justify-center">
          <img
            className="w-48 h-48 object-cover rounded-full border border-gray-200"
            src={docInfo?.image}
            alt={docInfo?.name}
          />
        </div>

        {/* Right: Doctor Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              {docInfo?.name}
            </h2>
            <img className="w-5" src={assets.verified_icon} alt="verified" />
          </div>
          <div className="mt-2 text-gray-600 text-sm">
            <p>
              {docInfo?.degree} -{' '}
              {specialitiesMap[docInfo.speciality] || 'Unknown Speciality'}
            </p>
            <p className="inline-block py-0.5 px-2 border text-xs rounded-full mt-1">
              {docInfo?.experience || '0'} years experience
            </p>
          </div>

          {/* About Doctor */}
          <div className="mt-4">
            <p className="text-gray-800 text-sm font-medium mb-1 flex items-center gap-1">
              About
              <img src={assets.info_icon} alt="info" className="w-4 h-4" />
            </p>
            <p className="text-gray-600 text-sm">{docInfo?.about}</p>
          </div>

          {/* Fee */}
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee :{' '}
            <span className="text-gray-600">
              {currencySymbol} {docInfo?.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Available Slots
        </h3>

        {/* Date Selector */}
        <div className="flex gap-3 items-center w-full overflow-x-auto pb-4">
          {dates.map((date, index) => {
            const dayName = daysOfWeek[date.getDay()];
            const dayNum = date.getDate();
            const isActive = slotIndex === index;
            return (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-[64px] text-center py-4 px-2 rounded-xl cursor-pointer
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }
                `}
              >
                <p className="text-sm font-medium">{dayName}</p>
                <p className="text-base">{dayNum}</p>
              </div>
            );
          })}
        </div>

        {/* Time Slots */}
        <div className="flex gap-3 flex-wrap items-center w-full pb-4">
          {docSlots.length > 0 && docSlots[slotIndex] ? (
            docSlots[slotIndex].length > 0 ? (
              docSlots[slotIndex].map((item, idx) => {
                const isSelected = item.time === slotTime;
                return (
                  <div
                    key={idx}
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light px-4 py-2 rounded-full cursor-pointer
                      transition-all duration-200
                      ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }
                    `}
                  >
                    {item.time}
                  </div>
                );
              })
            ) : (
              <p className="text-red-500">No available slots this day.</p>
            )
          ) : (
            <p className="text-gray-500">Loading slots...</p>
          )}
        </div>

        {/* Book Button */}
        <button
          onClick={bookAppointment}
          className="bg-blue-600 text-white py-3 px-8 rounded-full mt-4"
        >
          Book an Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
    </div>
  );
};

export default Appointment;
