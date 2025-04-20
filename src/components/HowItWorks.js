"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";


const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      id: 1,
      title: "Book Appointment",
      description: "Choose your preferred service and select a convenient date and time.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Confirm Details",
      description: "Receive confirmation and reminders via email or text message.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Choose Location",
      description: "Decide between in-shop service or convenient on-call at your location.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Enjoy Your Service",
      description: "Relax and enjoy a premium barber experience tailored to your preferences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-[var(--background-light)]">
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
          <h2 className="text-4xl font-bold mb-4 text-[var(--black)]">
            How It <span className="text-[var(--primary-color)]">Works</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--primary-color)] mx-auto mb-8"></div>
          <p className="text-lg text-[var(--black)] max-w-2xl mx-auto">
            Booking your next haircut is simple and convenient. Follow these easy steps to get started.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="bg-[var(--background-medium)] p-8 rounded-lg text-center relative"
              variants={itemVariants}
            >
              {/* Step Number */}
              <div className="absolute -top-5 -left-5 bg-[var(--primary-color)] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                {step.id}
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[var(--primary-color)] z-0"></div>
              )}
              
              {/* Icon */}
              <div className="text-[var(--primary-color)] flex justify-center mb-4">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-[var(--primary-color)] ">{step.title}</h3>
              <p className="text-[var(--white)]">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg text-slate-700 mb-6">
            Ready to experience premium barber services?
          </p>
          <Link href="/book">
            <motion.button 
              className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK YOUR APPOINTMENT
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
