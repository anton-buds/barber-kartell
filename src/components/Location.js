"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Location = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const businessHours = [
    { day: "Monday", hours: "10:00 AM - 7:00 PM" },
    { day: "Tuesday", hours: "10:00 AM - 7:00 PM" },
    { day: "Wednesday", hours: "10:00 AM - 7:00 PM" },
    { day: "Thursday", hours: "10:00 AM - 7:00 PM" },
    { day: "Friday", hours: "10:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "11:00 AM - 7:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 7:00 PM" },
  ];

  return (
    <section id="location" className="py-20 bg-slate-50">
      <div
        className="container mx-auto px-6"
        ref={ref}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Find <span className="text-blue-600">Us</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Visit our shop for an in-person experience or book our mobile service for the ultimate convenience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map and Address */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Location</h3>
              <div className="flex items-start mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-bold">Barber Kartell</p>
                  <p className="text-slate-600">QuezonDrive Multipurpose Hall</p>
                  <p className="text-slate-600">Camp Dau rd, Mabalacat, Pampanga 2010</p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-slate-600">+63 949 796 8797</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-slate-600">gabthebarber@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-lg h-[300px] bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-slate-600">Interactive Map Would Be Embedded Here</p>
              </div>
              {/* In a real implementation, you would embed a Google Map or similar here */}
            </div>
          </motion.div>

          {/* Hours and Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Business Hours</h3>
              <div className="space-y-2">
                {businessHours.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between py-2 ${
                      index < businessHours.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                  >
                    <span className={`font-medium ${item.day === "Sunday" ? "text-red-500" : ""}`}>
                      {item.day}
                    </span>
                    <span className={`${item.day === "Sunday" ? "text-red-500" : "text-slate-600"}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src=""
                alt="Barber Shop Interior"
                width={200}
                height={200}
                className="w-full h-auto"
              />
              <div className="bg-white p-4">
                <p className="text-center text-slate-600 italic">
                  "A premium space designed for your comfort and style."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg text-slate-700 mb-2">
            <span className="font-bold">On-Call Service Available:</span> Can't make it to the shop?
          </p>
          <p className="text-lg text-slate-700 mb-6">
            I'll bring the premium barber experience directly to your location.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
