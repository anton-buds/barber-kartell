"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
      <div
        className="container mx-auto px-6"
        ref={ref}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-xl text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Next Great Haircut?
          </h2>
          <p className="text-xl md:text-2xl mb-10 body-text" style={{ color: 'var(--white)', opacity: 0.9 }}>
            Book your appointment today and experience the difference of a premium barber service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <motion.button
                className="bg-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-opacity-90 transition-all duration-300" style={{ color: 'var(--primary-color)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK AN APPOINTMENT
              </motion.button>
            </Link>
            <Link href="/#services">
              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-opacity-20 transition-all duration-300" style={{ ':hover': { backgroundColor: 'var(--secondary-color)', borderColor: 'var(--secondary-color)' } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW SERVICES
              </motion.button>
            </Link>
          </div>
          <motion.div
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold text-lg font-heading">Quick Appointments</p>
                <p style={{ color: 'var(--white)', opacity: 0.9 }}>In and out in under an hour</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-bold text-lg font-heading">On-Call Service</p>
                <p style={{ color: 'var(--white)', opacity: 0.9 }}>We come to your location</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
