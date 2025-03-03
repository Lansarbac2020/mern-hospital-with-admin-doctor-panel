import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext.jsx';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { AdminContext } from '../context/AdminContext.jsx';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const { speciality, getAllSpeciality } = useContext(AdminContext);

  useEffect(() => {
    getAllSpeciality();
  }, []);

  const specialitiesMap = useMemo(() => {
    return Array.isArray(speciality)
      ? speciality.reduce((acc, spec) => {
          acc[spec._id] = spec.name;
          return acc;
        }, {})
      : {};
  }, [speciality]);

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            Expert Medical Professionals
          </span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 mb-6">
            Top Doctors
          </h2>
          <p className="text-gray-600 text-lg">
            Connect with our highly qualified and experienced medical professionals
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {doctors.slice(0, 4).map((doctor, index) => (
            <div
              key={index}
              onClick={() => handleDoctorClick(doctor._id)}
              className="group bg-white rounded-2xl border border-gray-100 
                         hover:border-blue-100 hover:shadow-xl cursor-pointer
                         transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-blue-50">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-center 
                             group-hover:scale-105 transition-transform duration-500"
                />
                {/* Availability Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm
                              font-medium ${doctor.available 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-gray-50 text-gray-600'}`}
                >
                  {doctor.available ? 'Available' : 'Unavailable'}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600
                               transition-colors duration-200">
                  {doctor.name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600">Top Rated Specialist</span>
                </div>

                <p className="mt-2 text-blue-600 font-medium">
                  {specialitiesMap[doctor.speciality] || "Unknown Speciality"}
                </p>

                {doctor.location && (
                  <div className="mt-3 flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.location}</span>
                  </div>
                )}

                {/* Book Now Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    className="w-full bg-blue-50 text-blue-600 px-4 py-2 rounded-lg
                               group-hover:bg-blue-600 group-hover:text-white
                               transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Book Appointment
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              navigate('/doctors');
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white 
                       px-8 py-4 rounded-full hover:bg-blue-700 
                       transition-colors duration-200 group"
          >
            View All Doctors
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
