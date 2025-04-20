"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative text-[var(--black)] flex justify-center items-center min-h-screen py-20 pointer-events-auto" style={{ background: 'linear-gradient(to bottom, var(--background-medium), var(--white))' }}>
      <div className="container mx-auto flex flex-col md:flex-row lg:flex-row items-center px-6 py-16 z-10">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="heading-xl text-6xl md:text-6xl font-bold leading-tight ">
            PREMIUM <span style={{ color: 'var(--primary-color)' }}>BARBER</span> EXPERIENCE
          </h1>
          <p className="font-body mt-6 text-xl md:text-2xl body-text" style={{ color: 'var(--black)' }}>
            Quality cuts. Superior products. <br />
            <span className="italic font-semibold">For everybody.</span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/book">
              <motion.button
                className="px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300 cursor-pointer" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white)', ':hover': { backgroundColor: 'var(--secondary-color)' } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK NOW
              </motion.button>
            </Link>
            <Link href="/#services">
              <motion.button
                className=" border-2 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 cursor-pointer" style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)', ':hover': { backgroundColor: 'rgba(70, 130, 180, 0.1)' } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                OUR SERVICES
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Image or Decorative Element */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: 'var(--primary-color)' }}>
            <Image
              src="/barber/barber-1.jpg"
              width={400}
              height={400}
              alt="Barber Portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
