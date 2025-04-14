"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUpcomingAppointments } from '@/utils/googleCalendar';

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const upcomingAppointments = await getUpcomingAppointments(5);
        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch upcoming appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
        Upcoming Appointments
      </h3>

      {loading ? (
        <div className="text-center py-4">
          <div className="w-8 h-8 border-4 border-t-4 rounded-full animate-spin mx-auto" 
               style={{ borderColor: 'var(--primary-color) transparent transparent transparent' }}></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-4">No upcoming appointments.</div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{appointment.summary}</h4>
                  <p className="text-sm" style={{ color: 'var(--black)' }}>
                    {formatDateTime(appointment.start.dateTime)}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold" 
                     style={{ 
                       backgroundColor: 'var(--primary-light-color)', 
                       color: 'var(--black)' 
                     }}>
                  {new Date(appointment.end.dateTime) - new Date(appointment.start.dateTime) === 3600000 
                    ? '1 hour' 
                    : `${(new Date(appointment.end.dateTime) - new Date(appointment.start.dateTime)) / 3600000} hours`}
                </div>
              </div>
              {appointment.location && (
                <p className="text-sm mt-2" style={{ color: 'var(--black)', opacity: 0.8 }}>
                  <span className="font-semibold">Location:</span> {appointment.location}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
