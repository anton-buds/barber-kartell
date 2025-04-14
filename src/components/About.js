"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20" style={{ backgroundColor: 'var(--background-light)' }}>
      <div
        className="container mx-auto px-6"
        ref={ref}
      >
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="heading-lg text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            About <span style={{ color: 'var(--primary-color)' }}>Gabo</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--primary-color)' }}
            variants={itemVariants}
          ></motion.div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 rounded-lg" style={{ borderColor: 'var(--primary-color)' }}></div>
              <Image
                src="/barber/barber-2.jpg"
                width={500}
                height={500}
                alt="Barber at work"
                className="w-full h-auto rounded-lg shadow-xl relative z-10"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="md:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="heading-md text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}
              variants={itemVariants}
            >
              Why Choose Me
            </motion.h3>

            <motion.p
              className="text-lg mb-6 body-text" style={{ color: 'var(--black)' }}
              variants={itemVariants}
            >
              With over 10 years of experience in the industry, I've mastered the art of precision cutting and styling. My passion for barbering goes beyond just haircuts – it's about creating an experience that leaves you looking and feeling your best.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="p-2 rounded-full mr-4" style={{ backgroundColor: 'var(--primary-color)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Expert Precision</h4>
                  <p style={{ color: 'var(--black)' }}>Meticulous attention to detail in every cut</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="p-2 rounded-full mr-4" style={{ backgroundColor: 'var(--secondary-color)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Premium Products</h4>
                  <p style={{ color: 'var(--black)' }}>Only the finest hair care products used</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="p-2 rounded-full mr-4" style={{ backgroundColor: 'var(--secondary-color)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Personalized Service</h4>
                  <p style={{ color: 'var(--black)' }}>Tailored to your unique style and preferences</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="p-2 rounded-full mr-4" style={{ backgroundColor: 'var(--secondary-color)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Mobile Service</h4>
                  <p style={{ color: 'var(--black)' }}>Convenient on-call options available</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-lg italic" style={{ color: 'var(--primary-color)' }}
              variants={itemVariants}
            >
              "My goal is to exceed your expectations with every visit, whether at my shop or in the comfort of your own space."
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
