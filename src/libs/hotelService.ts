import { Hotel, HotelData } from "../../interface";
import { apiPath } from "./shared";
export const getHotels = async (searchParams?: { hotel?: string, province?: string }): Promise<Hotel> => {
  try {
    const response = await fetch(apiPath("/hotels"));
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

export const getHotel = async (id: string): Promise<HotelData> => {
  try {
    const response = await fetch(apiPath(`/hotels/${id}`));
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const jsonResponse = await response.json();
    return jsonResponse.data;

  } catch (error) {
    console.error(`Error fetching hotel with ID ${id}:`, error);
    throw error;
  }
};

export const createHotel = async (hotelData: Omit<HotelData, 'id'>, token?:string): Promise<HotelData> => {

  try {
    const response = await fetch(apiPath('/hotels'), {
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
    
    const jsonResponse = await response.json();
    return jsonResponse.data;

  } catch (error) {
    console.error('Error creating hotel:', error);
    throw error;
  }
};

export const updateHotel = async (id: string, hotelData: Partial<HotelData>, token?:string): Promise<HotelData> => {
  
  try {
    const response = await fetch(apiPath(`/hotels/${id}`), {
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
    
    const jsonResponse = await response.json();
    return jsonResponse.data;

  } catch (error) {
    console.error(`Error updating hotel with ID ${id}:`, error);
    throw error;
  }
};

export const deleteHotel = async (id: string,token?:string): Promise<void> => {
    
  try {
    const response = await fetch(apiPath(`/hotels/${id}`), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse.data;

  } catch (error) {
    console.error(`Error deleting hotel with ID ${id}:`, error);
    throw error;
  }
};