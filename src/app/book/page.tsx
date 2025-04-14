"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import CalendarView from "@/components/CalendarView";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import { createAppointment } from "@/utils/googleCalendar";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "shop",
    address: "",
    notes: "",
  });

  interface TimeSlot {
    start: string;
    end: string;
    available: boolean;
  }

  interface SelectedTimeSlot {
    date: string;
    timeSlot: TimeSlot;
  }

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<SelectedTimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeSlotSelect = (timeSlotData: SelectedTimeSlot) => {
    setSelectedTimeSlot(timeSlotData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTimeSlot) {
      setError("Please select a date and time for your appointment.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Create appointment in Google Calendar
      const appointmentData = {
        ...formData,
        date: selectedTimeSlot.date,
        timeSlot: selectedTimeSlot.timeSlot
      };

      await createAppointment(appointmentData);

      // If successful, show confirmation
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "HAIRCUT - ₱250",
    "Beard Trim - ₱150",
    "Haircut & Beard Combo - ₱350",
    "Hot Towel Shave - ₱200",
    "Kids Haircut - ₱200",
    "Home Service - From ₱350",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-20" style={{ backgroundColor: 'var(--background-light)' }}>
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h1 className="heading-lg text-4xl font-bold mb-4">
                Book Your <span style={{ color: 'var(--primary-color)' }}>Appointment</span>
              </h1>
              <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--primary-color)' }}></div>
              <p className="text-lg mb-4 body-text" style={{ color: 'var(--black)' }}>
                Book your next premium barber experience using our online calendar.
              </p>
              <div className="p-4 rounded-lg mb-6 max-w-2xl mx-auto" style={{ backgroundColor: 'rgba(128, 0, 32, 0.1)' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--primary-color)' }}>Booking Policy</h3>
                <p className="font-body" style={{ color: 'var(--black)' }}>
                  Strictly NO LAST MINUTE CANCELLATION. All customers may reschedule/cancel 5hrs before their appointment.
                </p>
                <p className="mt-2 font-body" style={{ color: 'var(--black)' }}>
                  DM for Overtime and home service appointments.
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6" style={{ color: '#4CAF50' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="heading-md text-2xl font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-lg mb-4 body-text" style={{ color: 'var(--black)' }}>
                  Thank you for booking with Barber Kartell. We've added your appointment to our calendar and sent a confirmation to your email.
                </p>
                <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(128, 0, 32, 0.1)' }}>
                  <h3 className="font-bold mb-2 font-heading">Appointment Details</h3>
                  <p className="font-body"><strong>Date:</strong> {selectedTimeSlot?.date}</p>
                  <p className="font-body"><strong>Time:</strong> {selectedTimeSlot?.timeSlot.start} - {selectedTimeSlot?.timeSlot.end}</p>
                  <p className="font-body"><strong>Service:</strong> {formData.service}</p>
                  <p className="font-body"><strong>Location:</strong> {formData.location === "shop" ? "At the Shop" : "On-Call Service"}</p>
                </div>
                <p className="text-md font-semibold mb-6" style={{ color: 'var(--primary-color)' }}>
                  BE THE BETTER VERSION OF YOURSELF
                </p>
                <Link href="/">
                  <button
                    className="px-6 py-3 rounded-full font-bold transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'var(--white)'
                    }}
                  >
                    RETURN TO HOME
                  </button>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar and Time Slots */}
                <div className="lg:col-span-2">
                  <CalendarView onSelectTimeSlot={handleTimeSlotSelect} />

                  {selectedTimeSlot && (
                    <motion.div
                      className="mt-6 p-4 rounded-lg"
                      style={{ backgroundColor: 'rgba(70, 130, 180, 0.2)', color: 'var(--black)' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-bold">Selected Time Slot:</p>
                      <p>Date: {selectedTimeSlot.date}</p>
                      <p>Time: {selectedTimeSlot.timeSlot.start} - {selectedTimeSlot.timeSlot.end}</p>
                    </motion.div>
                  )}
                </div>

                {/* Booking Form */}
                <div>
                  <motion.form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <h3 className="text-xl font-bold mb-4 font-heading" style={{ color: 'var(--primary-color)' }}>
                      Your Information
                    </h3>

                    {error && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Personal Information */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1 font-heading" style={{ color: 'var(--black)' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2"
                          style={{ '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 font-heading" style={{ color: 'var(--black)' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2"
                          style={{ '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1 font-heading" style={{ color: 'var(--black)' }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2"
                          style={{ '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
                        />
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-1 font-heading" style={{ color: 'var(--black)' }}>
                          Service *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2"
                          style={{ '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 font-heading" style={{ color: 'var(--black)' }}>
                          Location *
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="location"
                              value="shop"
                              checked={formData.location === "shop"}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            At the Shop
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="location"
                              value="on-call"
                              checked={formData.location === "on-call"}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            On-Call Service
                          </label>
                        </div>
                      </div>

                      {formData.location === "on-call" && (
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium mb-1 font-heading" style={{ color: 'var(--black)' }}>
                            Address (for On-Call Service) *
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required={formData.location === "on-call"}
                            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2"
                            style={{ '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium mb-1 font-heading" style={{ color: 'var(--black)' }}>
                          Special Requests or Notes
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2"
                          style={{ '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-6">
                      <motion.button
                        type="submit"
                        className="w-full py-3 rounded-full text-lg font-bold transition-all duration-300"
                        style={{
                          backgroundColor: 'var(--primary-color)',
                          color: 'var(--white)'
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isSubmitting || !selectedTimeSlot}
                      >
                        {isSubmitting ? "Booking..." : "CONFIRM BOOKING"}
                      </motion.button>
                      {!selectedTimeSlot && (
                        <p className="text-sm mt-2 text-center" style={{ color: 'var(--black)' }}>
                          Please select a date and time first
                        </p>
                      )}
                    </div>
                  </motion.form>
                </div>
              </div>
            )}

            {/* Upcoming Appointments Section */}
            {!isSubmitted && (
              <div className="mt-16">
                <UpcomingAppointments />
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
