import { BookingData, Booking } from "../../interface";
import { apiPath, getToken } from "./shared";

export const getBookings = async (): Promise<Booking> => {
  const token = getToken();

  if(!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(apiPath("/bookings"), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(!response.ok){
        throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const getBookingById = async (bookingId: string): Promise<BookingData> => {
  const token = getToken();

  if(!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(apiPath(`/bookings/${bookingId}`), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const jsonResponse = await response.json();
    return jsonResponse.data;

  } catch (error) {
    console.error(`Error fetching booking ${bookingId}:`, error);
    throw error;
  }
};

/**
 * Create a new booking for a hotel
 * @param hotelId - ID of the hotel to book
 * @param startDate - Start date of the booking (ISO format string)
 * @param endDate - End date of the booking (ISO format string)
 * @returns Promise with the created booking data
 */
export const createBooking = async (hotelId: string, startDate: string, endDate: string): Promise<BookingData> => {
  const token = getToken();
  
  if(!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(apiPath(`/hotels/${hotelId}/bookings`),{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate
        })
      }
    );
    
    const jsonResponse = await response.json();
    return jsonResponse.data;

  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Update an existing booking
 * @param bookingId - ID of the booking to update
 * @param startDate - New start date of the booking (ISO format string)
 * @param endDate - New end date of the booking (ISO format string)
 * @returns Promise with the updated booking data
 */
export const updateBooking = async (bookingId: string, startDate: string, endDate: string): Promise<BookingData> => {
  const token = getToken();

  if(!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(apiPath(`/bookings/${bookingId}`),{
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate
        })
      }
    );
    
    const jsonResponse = await response.json();
    return jsonResponse.data;

  } catch (error) {
    console.error(`Error updating booking ${bookingId}:`, error);
    throw error;
  }
};

export const deleteBooking = async (bookingId: string): Promise<BookingData> => {
  const token = getToken();

  if(!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(apiPath(`/bookings/${bookingId}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const jsonResponse = await response.json();
    return jsonResponse.data;

  } catch (error) {
    console.error(`Error deleting booking ${bookingId}:`, error);
    throw error;
  }
};