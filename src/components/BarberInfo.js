"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const BarberInfo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Auto-hide after 5 seconds with countdown
    if (isVisible && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (countdown === 0) {
      setIsVisible(false);
    }
  }, [isVisible, countdown]);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg max-w-2xl w-full p-8 relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Close button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Auto-close countdown */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
          {countdown}
        </div>

        {/* Logo and title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Image 
              src="/Logo.png"
              width={80}
              height={80}
              alt="Barber Kartell Logo"
              className="rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-blue-600">Barber Kartell</h2>
          <p className="text-lg text-gray-600 mt-2">Mabalacat, Pampanga</p>
        </div>

        {/* Key information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Opening Hours</h3>
            <ul className="space-y-1 text-gray-700">
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>10 AM - 7 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Monday:</span>
                <span>10 AM - 7 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Tuesday:</span>
                <span>10 AM - 7 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Wednesday:</span>
                <span>10 AM - 7 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Thursday:</span>
                <span>10 AM - 7 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday:</span>
                <span>10 AM - 7 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>11 AM - 7 PM</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Contact & Location</h3>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> QuezonDrive Multipurpose Hall, Camp Dau rd, Mabalacat, Pampanga 2010
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> +63 949 796 8797
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> gabthebarber@gmail.com
            </p>
          </div>
        </div>

        {/* Booking policy */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-2 text-blue-700">Booking Policy</h3>
          <p className="text-gray-700">
            Strictly NO LAST MINUTE CANCELLATION. All customers may reschedule/cancel 5hrs before their appointment.
          </p>
          <p className="text-gray-700 mt-2">
            DM for Overtime and home service appointments.
          </p>
        </div>

        {/* Tagline */}
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-blue-600">BE THE BETTER VERSION OF YOURSELF</p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/book">
            <motion.button 
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK NOW
            </motion.button>
          </Link>
          <motion.button 
            onClick={() => setIsVisible(false)}
            className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE SITE
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BarberInfo;
