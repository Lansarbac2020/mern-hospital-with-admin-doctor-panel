import React, { useContext, useEffect, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { FaTrashAlt } from "react-icons/fa";

const DoctorsList = () => {
  const { 
    doctors, 
    aToken, 
    getAllDoctors, 
    deleteDoctor, 
    changeAvailability, 
    getAllSpeciality, 
    speciality 
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getAllSpeciality(); // This updates the context state 'speciality'
    }
  }, [aToken]);

  // Convert speciality array into a mapping { specialityId: specialityName }
  const specialitiesMap = useMemo(() => {
    return Array.isArray(speciality)
      ? speciality.reduce((acc, spec) => {
          acc[spec._id] = spec.name;
          return acc;
        }, {})
      : {};
  }, [speciality]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex flex-wrap gap-4 mt-5 w-full pt-5 gap-y-6'>
        {doctors.map((doctor, index) => (
          <div
            className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'
            key={index}
          >
            <img
              className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'
              src={doctor.image}
              alt="doctor"
            />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{doctor.name}</p>
              <p className='text-zinc-600 text-sm'>
                {specialitiesMap[doctor.speciality] || "Unknown Speciality"}
              </p>
              <div className='flex justify-between'>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input
                    onChange={() => changeAvailability(doctor._id)}
                    type="checkbox"
                    checked={doctor.available}
                  />
                  <p className='text-slate-800'>Available</p>
                </div>
                <p
                  className='text-end text-primary hover:text-red-900 cursor-pointer'
                  onClick={() => deleteDoctor(doctor._id)}
                >
                  <FaTrashAlt />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
