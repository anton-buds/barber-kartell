"use client";

// Google Calendar API integration
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Your Google Calendar API credentials
// In production, these should be stored in environment variables
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || 'primary';

let tokenClient;
let gapiInited = false;
let gisInited = false;

/**
 * Initialize the Google API client
 */
export const initializeGoogleApi = async () => {
  if (typeof window === 'undefined') return;
  
  // Load the Google API client library
  const gapiScript = document.createElement('script');
  gapiScript.src = 'https://apis.google.com/js/api.js';
  gapiScript.async = true;
  gapiScript.defer = true;
  gapiScript.onload = () => {
    window.gapi.load('client', initializeGapiClient);
  };
  document.head.appendChild(gapiScript);

  // Load the Google Identity Services library
  const gisScript = document.createElement('script');
  gisScript.src = 'https://accounts.google.com/gsi/client';
  gisScript.async = true;
  gisScript.defer = true;
  gisScript.onload = () => {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // Will be set later
    });
    gisInited = true;
  };
  document.head.appendChild(gisScript);
};

/**
 * Initialize the Google API client library
 */
const initializeGapiClient = async () => {
  await window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
};

/**
 * Sign in the user and get authorization to use the Google Calendar API
 */
export const handleAuthClick = () => {
  return new Promise((resolve, reject) => {
    if (!gapiInited || !gisInited) {
      reject('Google API not initialized');
      return;
    }

    tokenClient.callback = async (resp) => {
      if (resp.error) {
        reject(resp);
        return;
      }
      resolve(resp);
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
};

/**
 * Sign out the user
 */
export const handleSignoutClick = () => {
  const token = window.gapi.client.getToken();
  if (token !== null) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken('');
  }
};

/**
 * Get available time slots for a specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Array>} - Array of available time slots
 */
export const getAvailableTimeSlots = async (date) => {
  try {
    // Define business hours (e.g., 10 AM to 7 PM)
    const businessHours = {
      start: 10, // 10 AM
      end: 19,   // 7 PM
    };
    
    // Define appointment duration in minutes
    const appointmentDuration = 60; // 1 hour
    
    // Get events for the selected date
    const startTime = new Date(`${date}T00:00:00`);
    const endTime = new Date(`${date}T23:59:59`);
    
    const response = await window.gapi.client.calendar.events.list({
      'calendarId': CALENDAR_ID,
      'timeMin': startTime.toISOString(),
      'timeMax': endTime.toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime',
    });
    
    const events = response.result.items;
    
    // Generate all possible time slots
    const allTimeSlots = [];
    for (let hour = businessHours.start; hour < businessHours.end; hour++) {
      for (let minute = 0; minute < 60; minute += appointmentDuration) {
        const timeSlot = {
          start: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          end: `${(minute + appointmentDuration >= 60 ? hour + 1 : hour).toString().padStart(2, '0')}:${((minute + appointmentDuration) % 60).toString().padStart(2, '0')}`,
          available: true
        };
        allTimeSlots.push(timeSlot);
      }
    }
    
    // Mark booked slots as unavailable
    events.forEach(event => {
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);
      
      allTimeSlots.forEach(slot => {
        const slotStart = new Date(`${date}T${slot.start}:00`);
        const slotEnd = new Date(`${date}T${slot.end}:00`);
        
        // Check if the slot overlaps with the event
        if (
          (slotStart >= eventStart && slotStart < eventEnd) ||
          (slotEnd > eventStart && slotEnd <= eventEnd) ||
          (slotStart <= eventStart && slotEnd >= eventEnd)
        ) {
          slot.available = false;
        }
      });
    });
    
    return allTimeSlots;
  } catch (error) {
    console.error('Error getting available time slots:', error);
    throw error;
  }
};

/**
 * Create a new appointment in Google Calendar
 * @param {Object} appointmentData - Appointment data
 * @returns {Promise<Object>} - Created event
 */
export const createAppointment = async (appointmentData) => {
  try {
    const { date, timeSlot, name, email, phone, service, notes, location } = appointmentData;
    
    const startDateTime = new Date(`${date}T${timeSlot.start}:00`);
    const endDateTime = new Date(`${date}T${timeSlot.end}:00`);
    
    const event = {
      'summary': `${service} - ${name}`,
      'location': location === 'shop' ? 'Barber Shop' : `Client's Location: ${appointmentData.address}`,
      'description': `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Notes: ${notes || 'N/A'}
      `,
      'start': {
        'dateTime': startDateTime.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': endDateTime.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'attendees': [
        {'email': email}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 60}
        ]
      }
    };
    
    const request = window.gapi.client.calendar.events.insert({
      'calendarId': CALENDAR_ID,
      'resource': event,
      'sendUpdates': 'all'
    });
    
    const response = await new Promise((resolve, reject) => {
      request.execute(resp => {
        if (resp.error) {
          reject(resp.error);
        } else {
          resolve(resp);
        }
      });
    });
    
    return response;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

/**
 * Get upcoming appointments
 * @param {number} maxResults - Maximum number of results to return
 * @returns {Promise<Array>} - Array of upcoming appointments
 */
export const getUpcomingAppointments = async (maxResults = 10) => {
  try {
    const now = new Date();
    
    const response = await window.gapi.client.calendar.events.list({
      'calendarId': CALENDAR_ID,
      'timeMin': now.toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': maxResults,
      'orderBy': 'startTime'
    });
    
    return response.result.items;
  } catch (error) {
    console.error('Error getting upcoming appointments:', error);
    throw error;
  }
};
