"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      id: 1,
      name: "HAIRCUT",
      description: "BE THE BETTER VERSION OF YOURSELF",
      price: "₱250",
      duration: "1 hr",
      popular: true,
    },
    {
      id: 2,
      name: "Beard Trim",
      description: "Shape and line up your beard for a clean, polished look",
      price: "₱150",
      duration: "30 min",
    },
    {
      id: 3,
      name: "Haircut & Beard Combo",
      description: "Our most popular service - complete grooming package",
      price: "₱350",
      duration: "1 hr 15 min",
      popular: true,
    },
    {
      id: 4,
      name: "Hot Towel Shave",
      description: "Traditional straight razor shave with hot towel treatment",
      price: "₱200",
      duration: "45 min",
    },
    {
      id: 5,
      name: "Kids Haircut",
      description: "For children under 12 years old",
      price: "₱200",
      duration: "45 min",
    },
    {
      id: 6,
      name: "Home Service",
      description: "Premium haircut service at your location",
      price: "From ₱350",
      duration: "1 hr+",
      popular: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="services" className="py-20" style={{ backgroundColor: 'var(--background-medium)' }}>
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
          <h2 className="heading-lg text-4xl font-bold mb-4">
            Our <span style={{ color: 'var(--primary-color)' }}>Services</span>
          </h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--primary-color)' }}></div>
          <p className="text-lg max-w-2xl mx-auto body-text" style={{ color: 'var(--black)' }}>
            Premium barber services tailored to your style. Choose from our range of professional grooming options.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={`bg-white p-8 rounded-lg shadow-lg border ${
                service.popular ? 'border-[var(--primary-color)]' : 'border-gray-200'
              } hover:shadow-xl transition-all duration-300 relative`}
              variants={itemVariants}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}>
                  POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-3 font-heading">{service.name}</h3>
              <p className="mb-2 font-body" style={{ color: 'var(--black)' }}>{service.description}</p>
              <p className="mb-4 text-sm" style={{ color: 'var(--black)', opacity: 0.8 }}>Duration: {service.duration}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>{service.price}</span>
                <Link href="/book">
                  <button className="text-white px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all duration-300" style={{ backgroundColor: 'var(--primary-color)', ':hover': { backgroundColor: 'var(--secondary-color)' } }}>
                    BOOK NOW
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg mb-6" style={{ color: 'var(--black)' }}>
            Need a custom service or have special requirements?
          </p>
          <Link href="/book">
            <button className="text-white px-8 py-3 rounded-full text-lg font-bold transition-all duration-300" style={{ backgroundColor: 'var(--primary-color)', ':hover': { backgroundColor: 'var(--secondary-color)' } }}>
              CONTACT ME
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
