import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Year");
    const [fees, setFees] = useState("");
    const [speciality, setSpeciality] = useState("General%20physician");
    const [degree, setDegree] = useState("");
    const [education, setEducation] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [about, setAbout] = useState("");

const {backendUrl, aToken}=useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            
            if (!docImg) {
                return toast.error("Please upload doctor's image");
            }

        const formData = new FormData();
        formData.append("image", docImg);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("experience", experience);
        formData.append("fees", Number(fees));
        formData.append("speciality", speciality);
        formData.append("degree", degree);
    
        formData.append("address",JSON.stringify({
            line1: address1,
            line2: address2
        }));
        formData.append("about", about);

        formData.forEach((value,key)=>{
            console.log(`${key} ${value}`)
        })
        
   const {data}=await axios.post(backendUrl + '/api/admin/add-doctor',formData, { headers:{aToken}})
   if(data.success){
    toast.success(data.message)
    setDocImg(false);
    setName("");
    setEmail("");
    setPassword("");    
    //setExperience("1 Year");
    setFees("");
    //setSpeciality("General Physician");
    setDegree("");    
    setAbout("");      
    setAddress1("");
    setAddress2("");
   }else{
    toast.error(data.message)
   }
        } catch (error) {
            toast.error(error.message)
            //console.log("error",error);
        }

    }

  return (
    
      <form onSubmit={onSubmitHandler} className="w-full m-5  bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Add Doctor</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="doc-img"
              className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 bg-gray-100 border border-gray-300 rounded-full overflow-hidden"
            >
              <img
                src={ 
                    docImg ? URL.createObjectURL(docImg) :
                assets.upload_area}
                alt="Upload Area"
                className="w-20 h-20"
              />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" hidden id="doc-img" />
            <p className="text-gray-500 text-sm mt-3 text-center">
              Upload doctor's <br /> picture
            </p>
          </div>

          {/* Form Fields Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
              onChange={(e) => setName(e.target.value)}
              value={name}
                type="text"
                placeholder="Enter doctor's name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Doctor Email
              </label>
              <input
               onChange={(e) => setEmail(e.target.value)}
               value={email}
                type="email"
                placeholder="Enter doctor's email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Doctor Password
              </label>
              <input
               onChange={(e) => setPassword(e.target.value)}
               value={password}
                type="password"
                placeholder="Enter doctor's password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Doctor Experience
              </label>
              <select
               onChange={(e) => setExperience(e.target.value)}
               value={experience}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Doctor Fees
              </label>
              <input
               onChange={(e) => setFees(e.target.value)}
               value={fees}
                type="number"
                placeholder="Enter doctor's fees"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Speciality
              </label>
              <select
               onChange={(e) => setSpeciality(e.target.value)}
               value={speciality}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="General%20physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Doctor Education
              </label>
              <input
               onChange={(e) => setDegree(e.target.value)}
               value={degree}
                type="text"
                placeholder="Enter doctor's education"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Doctor Address
              </label>
              <div className="space-y-2">
                <input
                 onChange={(e) => setAddress1(e.target.value)}
                 value={address1}
                  type="text"
                  placeholder="Enter doctor's address 1"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                 onChange={(e) => setAddress2(e.target.value)}
                 value={address2}
                  type="text"
                  placeholder="Enter doctor's address 2"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Doctor About
          </label>
          <textarea
           onChange={(e) => setAbout(e.target.value)}
           value={about}
            placeholder="Enter doctor's about"
            rows={5}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 p-5 bg-primary text-white font-medium py-3 rounded-lg hover:scale-105 transition transform"
        >
          Add Doctor
        </button>
      </form>
  );
};

export default AddDoctor;