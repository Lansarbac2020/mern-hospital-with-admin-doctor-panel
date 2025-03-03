import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const SpecialityMenu = () => {
  const { speciality, getAllSpeciality } = useContext(AdminContext);

  useEffect(() => {
    getAllSpeciality();
  }, [getAllSpeciality]);

  return (
    <div className="flex flex-col items-center gap-5 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="text-center sm:w-1/3 text-sm">
        Consult with specialized doctors based on your medical needs
      </p>
      <div className="flex gap-4 overflow-x-auto pt-5 sm:justify-center w-full px-4">
        {speciality.map((item) => (
          <Link
            key={item._id}
            to={`/doctors/${item._id}`}
            className="flex flex-col items-center gap-2 text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img 
              className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full mb-2"
              src={item.image} 
              alt={item.name} 
            />
            <p className="text-center font-medium">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;