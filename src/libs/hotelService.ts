import { Hotel } from "../../interface";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/api/v1';

const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token;
  }
  return null;
};

export const getHotels = async (): Promise<Hotel[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

export const getHotel = async (id: string): Promise<Hotel> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching hotel with ID ${id}:`, error);
    throw error;
  }
};

export const createHotel = async (hotelData: Omit<Hotel, 'id'>): Promise<Hotel> => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/hotels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(hotelData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw error;
  }
};

export const updateHotel = async (id: string, hotelData: Partial<Hotel>): Promise<Hotel> => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(hotelData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating hotel with ID ${id}:`, error);
    throw error;
  }
};

export const deleteHotel = async (id: string): Promise<void> => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting hotel with ID ${id}:`, error);
    throw error;
  }
};