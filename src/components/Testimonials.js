"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Josh",
    role: "Regular Client",
    quote: "Gabo is hands down the best barber I've ever had. His attention to detail and skill with a razor is unmatched. I always leave looking and feeling my best.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ralph",
    role: "Regular Client",
    quote: "I've been going to Gabo for over 2 years now. His on-call service is a game-changer for my busy schedule. Professional, punctual, and perfect cuts every time.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    name: "Pj",
    role: "First-time Client",
    quote: "Was recommended by a friend and I'm so glad I went. Gabo took the time to understand exactly what I wanted and delivered beyond my expectations.",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    id: 4,
    name: "Chris Parker",
    role: "Weekly Client",
    quote: "As someone who's particular about my appearance, I wouldn't trust anyone else with my hair. Gabo's skill and consistency keep me coming back every week.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
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
            Client <span className="text-red-900">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-red-900 mx-auto mb-8"></div>
          <p className="text-lg text-slate-900 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about their experience.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden relative h-[400px] md:h-[300px]">
            <AnimatePresence initial={false} custom={current}>
              <motion.div
                key={current}
                custom={current}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full h-full"
              >
                <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="shrink-0">
                      <img
                        src={testimonials[current].avatar}
                        alt={testimonials[current].name}
                        className="w-20 h-20 rounded-full border-4 border-red-900 object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-300 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-lg md:text-xl italic text-slate-700 mb-6">
                        "{testimonials[current].quote}"
                      </p>
                      <div>
                        <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
                        <p className="text-slate-600">{testimonials[current].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors duration-300 z-10"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  current === index ? "bg-red-900" : "bg-slate-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
