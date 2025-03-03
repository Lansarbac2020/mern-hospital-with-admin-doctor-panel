import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const AddSpeciality = () => {
    
    const {backendUrl, aToken}=useContext(AdminContext);
    
    const [image, setImage] = useState('');
    const [name, setName] = useState('');


    const onSubmitHandler =async(e)=>{
        e.preventDefault();
        try {
            if (!image) {
                return toast.error("Please upload doctor's image");
            }
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);

        const {data}=await axios.post(backendUrl + '/api/admin/add-speciality',formData,{headers:{aToken}})

        if(data.success){
            toast.success(data.message);
            setImage(false)
            setName('');
        }
        else{
            toast.error(data.message);
        }
        } catch (error) {
            toast.error(error.message);
        }
        
    }
  return (
    <form onSubmit={onSubmitHandler}
    className='w-full m-5 bg-white shadow-lg rounded-lg p-8'
    >
        <h1 className='text-2xl font-semibold text-gray-700 mb-6'>
            Add New Speciality
        </h1>
        <div className="flex flex-col items-center">
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 bg-gray-100 border border-gray-300 rounded-full overflow-hidden"
                    >
                      <img
                        src={ 
                            image ? URL.createObjectURL(image) :
                        assets.upload_area}
                        alt="Upload Area"
                        className="w-20 h-20"
                      />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden id="image" />
                    <p className="text-gray-500 text-sm mt-3 text-center">
                      Upload speciality's <br /> picture
                    </p>
                  </div>
                  <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
              onChange={(e) => setName(e.target.value)}
              value={name}
                type="text"
                placeholder="speciality title"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
        <button
        type='submit'
        disabled={!name}
        className='mt-6 p-5 bg-primary text-white font-medium py-3 rounded-lg hover:scale-105 transition transform'
        >
           Add Speciality
        </button>
    </form>
  )
}

export default AddSpeciality