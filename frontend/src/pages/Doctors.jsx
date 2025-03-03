import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/Appcontext.jsx';
import { AdminContext } from '../context/AdminContext';

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  
  const { speciality: specialityId } = useParams();
  const { doctors } = useContext(AppContext);
  const { speciality: specialities } = useContext(AdminContext);

  const applyFilter = () => {
    if (specialityId) {
      setFilterDoc(doctors.filter(doc => doc.speciality === specialityId));
    } else {
      setFilterDoc(doctors);
    }
  };

  const getSpecialityName = (id) => {
    const spec = specialities.find(s => s._id === id);
    return spec ? spec.name : 'Unknown Speciality';
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specialityId]);

  return (
    <div className="p-4">
      <p className='text-gray-600'>Browse through our qualified medical specialists.</p>
      
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button 
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        {/* Speciality Filters */}
        <div className={`flex-col gap-4 text-sm text-gray-600 cursor-pointer ${
          showFilter ? 'flex' : 'hidden sm:flex'
        }`}>
          {specialities.map((spec) => (
            <p
              key={spec._id}
              onClick={() => navigate(specialityId === spec._id ? '/doctors' : `/doctors/${spec._id}`)}
              className={`w-[94vw] sm:w-auto pl-1.5 py-1.5 pr-16 border ${
                specialityId === spec._id ? "bg-indigo-100 text-black" : "border-gray-300"
              }`}
            >
              {spec.name}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden hover:translate-y-2 transition-all duration-300 cursor-pointer'
            >
              <img className='w-full h-68 object-cover bg-blue-50' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className={`flex gap-2 items-center text-sm ${
                  item.available ? 'text-green-600' : 'text-gray-500'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                  {item.available ? 'Available' : 'Not Available'}
                </div>
                <h3 className='text-lg font-bold text-gray-900 mt-2'>{item.name}</h3>
                <p className='text-gray-600 text-sm'>{getSpecialityName(item.speciality)}</p>
                <p className='text-gray-900 text-sm mt-2'>
                  Experience: {item.experience || '0'} years
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;