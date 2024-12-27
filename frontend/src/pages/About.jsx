import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dedicated to revolutionizing healthcare through innovative technology and compassionate care
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
        <div className="md:w-1/2">
          <img 
            src={assets.about_image} 
            alt="Healthcare professionals" 
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        <div className="md:w-1/2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2020, we've been at the forefront of digital healthcare transformation. 
              Our platform connects patients with qualified healthcare professionals, making quality 
              healthcare accessible to everyone.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible, affordable, and high-quality healthcare services through 
              innovative technology solutions that empower both patients and healthcare providers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a world where quality healthcare is accessible to everyone, anywhere, 
              anytime. We strive to be the global leader in digital healthcare solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 rounded-xl p-8">
        <div className="text-center">
          <p className="text-4xl font-bold text-primary mb-2">10K+</p>
          <p className="text-gray-600">Patients Served</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-primary mb-2">500+</p>
          <p className="text-gray-600">Verified Doctors</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-primary mb-2">98%</p>
          <p className="text-gray-600">Patient Satisfaction</p>
        </div>
      </div>
    </div>
  );
};

export default About;