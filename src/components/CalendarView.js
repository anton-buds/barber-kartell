"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { initializeGoogleApi, handleAuthClick, getAvailableTimeSlots } from '@/utils/googleCalendar';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ onSelectTimeSlot }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isApiInitialized, setIsApiInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize Google API
  useEffect(() => {
    const initApi = async () => {
      try {
        await initializeGoogleApi();
        setIsApiInitialized(true);
      } catch (error) {
        console.error('Error initializing Google API:', error);
        setError('Failed to initialize Google Calendar. Please try again later.');
      }
    };

    initApi();
  }, []);

  // Handle authentication
  const handleAuth = async () => {
    try {
      setLoading(true);
      await handleAuthClick();
      setIsAuthenticated(true);
      await fetchTimeSlots(formatDate(date));
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch available time slots for the selected date
  const fetchTimeSlots = async (dateString) => {
    try {
      setLoading(true);
      const slots = await getAvailableTimeSlots(dateString);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setError('Failed to fetch available time slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (isAuthenticated) {
      fetchTimeSlots(formatDate(newDate));
    }
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot) => {
    if (timeSlot.available) {
      onSelectTimeSlot({
        date: formatDate(date),
        timeSlot
      });
    }
  };

  // Check if date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Disable past dates in calendar
  const tileDisabled = ({ date }) => {
    return isPastDate(date);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--primary-color)' }}>
        Select Appointment Date & Time
      </h3>

      {!isApiInitialized ? (
        <div className="text-center py-4">
          <p className="mb-4">Initializing calendar...</p>
          <div className="w-10 h-10 border-4 border-t-4 rounded-full animate-spin mx-auto" 
               style={{ borderColor: 'var(--primary-color) transparent transparent transparent' }}></div>
        </div>
      ) : !isAuthenticated ? (
        <div className="text-center py-4">
          <p className="mb-4">Please authenticate to access the booking calendar</p>
          <button
            onClick={handleAuth}
            className="px-6 py-2 rounded-full font-bold shadow-md"
            style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: 'var(--white)'
            }}
          >
            Connect with Google Calendar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileDisabled={tileDisabled}
              className="w-full border-none shadow-md rounded-lg"
            />
          </div>

          {/* Time Slots */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              Available Time Slots for {date.toLocaleDateString()}
            </h4>
            
            {loading ? (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-4 border-t-4 rounded-full animate-spin mx-auto" 
                     style={{ borderColor: 'var(--primary-color) transparent transparent transparent' }}></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : timeSlots.length === 0 ? (
              <div className="text-center py-4">No time slots available for this date.</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot, index) => (
                  <motion.button
                    key={index}
                    className={`py-2 px-4 rounded-md text-center ${
                      slot.available 
                        ? 'cursor-pointer hover:opacity-80' 
                        : 'cursor-not-allowed opacity-50'
                    }`}
                    style={{ 
                      backgroundColor: slot.available ? 'var(--primary-color)' : 'var(--muted)',
                      color: 'var(--white)'
                    }}
                    onClick={() => handleTimeSlotSelect(slot)}
                    disabled={!slot.available}
                    whileHover={slot.available ? { scale: 1.05 } : {}}
                    whileTap={slot.available ? { scale: 0.95 } : {}}
                  >
                    {slot.start} - {slot.end}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
