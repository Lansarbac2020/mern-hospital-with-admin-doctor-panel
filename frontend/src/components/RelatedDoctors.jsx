import React, { useContext, useEffect, useState,useMemo } from 'react';
import { AppContext } from '../context/Appcontext.jsx';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const { speciality: specialities, getAllSpeciality } = useContext(AdminContext);
  const navigate = useNavigate();
  
  const [relatedDocs, setRelatedDocs] = useState([]);

  // Create speciality ID to name mapping
  const specialitiesMap = useMemo(() => {
    return specialities.reduce((acc, spec) => {
      acc[spec._id] = spec.name;
      return acc;
    }, {});
  }, [specialities]);

  useEffect(() => {
    getAllSpeciality();
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(doc => 
        doc.speciality === speciality && 
        doc._id !== docId
      );
      setRelatedDocs(filtered);
    }
  }, [doctors, docId, speciality, getAllSpeciality]);

  return (
    <div className='flex flex-col items-center gap-5 my-16 md:mx-10 py-16 text-gray-800'>
      <h1 className='text-3xl font-bold'>Related Doctors</h1>
      <p className='sm:w-1/3 text-sm text-center'>Top specialists in {specialitiesMap[speciality] || 'this field'}</p>
      
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 px-3 sm:px-0'>
        {relatedDocs.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className='border border-blue-200 rounded-xl overflow-hidden hover:translate-y-2 transition-all duration-300 cursor-pointer'
          >
            <img 
              className='w-full h-48 object-cover bg-blue-50' 
              src={item.image} 
              alt={item.name} 
            />
            <div className='p-4'>
              <div className={`flex gap-2 items-center text-sm ${
                item.available ? 'text-green-600' : 'text-gray-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                {item.available ? 'Available' : 'Not Available'}
              </div>
              <h3 className='text-lg font-bold text-gray-900 mt-2'>{item.name}</h3>
              <p className='text-gray-600 text-sm'>
                {specialitiesMap[item.speciality] || 'General Physician'}
              </p>
              <p className='text-gray-900 text-sm mt-2'>
                Experience: {item.experience || '0'} years
              </p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className='bg-primary text-gray-900 hover:scale-105 px-12 py-3 mt-10 rounded-full transition-transform duration-300'
      >
        View All
      </button>
    </div>
  );
};

export default RelatedDoctors;