import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const updateUserProfileData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEditing(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }finally{
      setLoading(false); //stop loading
    }
  };

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* Profile Picture */}
      {isEditing ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile Preview"
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={image ? '' : assets.upload_icon}
              alt="Upload Icon"
            />
          </div>
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      ) : (
        <img className="w-36 rounded" src={userData.image} alt="Profile" />
      )}

      {/* Profile Details */}
      {isEditing ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone</p>
          {isEditing ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEditing ? (
            <p>
              <input
                className="bg-gray-50"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
              />
              <br />
              <input
                className="bg-gray-50"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">PERSONAL INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender :</p>
          {isEditing ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p>Date of Birth :</p>
          {isEditing ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  dob: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='mt-10'>
        {isEditing ? (
          <button
            className={`border border-primary text-primary l px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={updateUserProfileData}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        ) : (
          <button
            className='border border-primary text-primary l px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300'
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
