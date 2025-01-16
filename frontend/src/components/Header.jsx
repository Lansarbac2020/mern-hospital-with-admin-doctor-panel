import React from 'react';
import { ArrowRight, Star, Users, Calendar } from 'lucide-react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content Section */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            {/* Stats Banner */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md 
                          rounded-full px-4 py-2 text-white/90 text-sm mb-6">
              <Star className="h-4 w-4 text-yellow-400" />
              Trusted by 10,000+ patients
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Your Health Journey
              <span className="block mt-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Begins With Expert Care
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-blue-100 max-w-xl mx-auto lg:mx-0">
              Connect with board-certified specialists who provide personalized care 
              tailored to your unique health needs.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6">
              {[
                { icon: <Users className="h-5 w-5" />, stat: "500+", label: "Specialists" },
                { icon: <Star className="h-5 w-5" />, stat: "4.9/5", label: "Rating" },
                { icon: <Calendar className="h-5 w-5" />, stat: "24/7", label: "Support" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center lg:items-start 
                                         p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <div className="text-blue-300 mb-2">{item.icon}</div>
                  <div className="text-2xl font-bold text-white">{item.stat}</div>
                  <div className="text-sm text-blue-200">{item.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white rounded-full font-medium
                               text-blue-600 hover:bg-blue-50 transition-all duration-300
                               flex items-center justify-center gap-2 group">
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="w-full sm:w-auto px-8 py-4 rounded-full font-medium
                               text-white border border-white/20 hover:bg-white/10
                               transition-all duration-300">
                View Specialists
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square relative z-10">
              <img
                src={assets.header_img}
                alt="Professional Healthcare"
                className="w-full h-full object-cover rounded-2xl shadow-2xl
                         transform transition-transform duration-500
                         hover:scale-105"
              />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl
                            flex items-center gap-4 animate-float">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Patient Satisfaction</div>
                  <div className="text-xl font-bold text-gray-900">98%</div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 
                          rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/20 
                          rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

// Add this to your CSS or Tailwind config
const style = {
  '.animate-float': {
    animation: 'float 3s ease-in-out infinite'
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0)'
    },
    '50%': {
      transform: 'translateY(-10px)'
    }
  }
};