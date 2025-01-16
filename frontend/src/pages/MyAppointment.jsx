import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, XCircle, Trash2, CreditCard } from 'lucide-react';

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const slotDateFormat = (slotDate) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (!slotDate) return "Invalid Date";
    try {
      const dateArray = slotDate.split('-');
      if (dateArray.length === 3) {
        const day = parseInt(dateArray[0], 10);
        const monthIndex = parseInt(dateArray[1], 10);
        const year = dateArray[2];
        if (monthIndex < 1 || monthIndex > 12 || isNaN(day) || isNaN(monthIndex)) {
          return "Invalid Date";
        }
        const month = months[monthIndex - 1];
        return `${day} ${month} ${year}`;
      }
      return "Invalid Date";
    } catch (error) {
      console.error("Error formatting slotDate:", error);
      return "Invalid Date";
    }
  };

  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch appointments.');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, 
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/delete-appointment/${appointmentId}`, {
        headers: { token }
      });
      if (data.success) {
        toast.success('Appointment deleted successfully');
        getUserAppointments();
      } else {
        toast.error(data.message || 'Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);  // Add logging for better debugging
      toast.error('Failed to delete appointment');
    }
    setDeleteConfirm(null);
  };
  

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        console.log(data.order);
      }
    } catch (error) {
      toast.error('Payment initialization failed');
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Active
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            Cancelled
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : appointments.length > 0 ? (
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm border 
                         ${item.cancelled ? 'border-red-100' : 'border-gray-100'} 
                         transition-all duration-200 hover:shadow-md`}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.docData.image}
                      alt={item.docData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.docData.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {item.docData.speciality}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{slotDateFormat(item.slotDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{item.slotTime}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <div>
                            <p className="text-sm">{item.docData.line1}</p>
                            <p className="text-sm">{item.docData.line2}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 min-w-[150px] justify-center">
                    {!item.cancelled && item.payment && item.isCompleted && (
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 
                                 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 
                                 transition-colors duration-200"
                      >
                        <CreditCard className="h-4 w-4" />
                        Pay Online
                      </button>
                    )}

                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 
                                 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 
                                 transition-colors duration-200"
                      >
                        <XCircle className="h-4 w-4" />
                        Cancel
                      </button>
                    )}

                    {item.cancelled && (
                      <div className="flex items-center justify-center gap-2 px-4 py-2 
                                    bg-red-50 text-red-600 rounded-lg">
                        <AlertCircle className="h-4 w-4" />
                        Cancelled
                      </div>
                    )}

                    {item.isCompleted && (
                      <div className="flex items-center justify-center gap-2 px-4 py-2 
                                    bg-green-50 text-green-600 rounded-lg">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                      </div>
                    )}

                    {(item.cancelled || item.isCompleted) && (
                      <button
                        onClick={() => setDeleteConfirm(item._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 
                                 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 
                                 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Delete Confirmation */}
              {deleteConfirm === item._id && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Are you sure you want to delete this appointment?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteAppointment(item._id)}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg 
                                 hover:bg-red-700 transition-colors duration-200"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments</h3>
          <p className="text-gray-600">You don't have any appointments scheduled.</p>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;