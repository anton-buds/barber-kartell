"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import HowItWorks from '@/components/HowItWorks';
import Location from '@/components/Location';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import TrueFocusEnhanced from '@/components/TrueFocusEnhanced';


export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Barber Info Popup */}
      {/* {<BarberInfo />} */}

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* TrueFocus Section */}
      <div className="relative h-screen flex items-center justify-center bg-[var(--black)]" style={{ background: 'linear-gradient(to bottom, var(--white), var(--background-medium))' }}>
        <div className="container mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <TrueFocusEnhanced
              sentence="BE THE BETTER VERSION OF YOURSELF"
              blurAmount={5}
              borderColor="var(--primary-color)"
              glowColor="var(--accent-color)"
              animationDuration={0.5}
              pauseBetweenAnimations={.2}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12"
          >
            <Link href="#hero">
              <motion.button
                className="bg-[var(--primary-color)] text-[var(--white)] px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:text-[var(--primary-color)] hover:bg-[var(--white)] transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DISCOVER MORE
              </motion.button>
            </Link>
          </motion.div>
          {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-sm text-slate-200 mb-2">Scroll to explore</p>
        <motion.div
          className="w-6 h-10 border-2 border-slate-200 rounded-full flex justify-center p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div
            className="w-1 h-2 bg-slate-200 rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div id="hero" className="relative">
        <Hero />
      </div>

      {/* Main Content Sections */}
      <About />
      <Services />
      <Testimonials />
      <HowItWorks />
      <Location />
      <CTA />
      <Footer />
    </div>
  );
}
