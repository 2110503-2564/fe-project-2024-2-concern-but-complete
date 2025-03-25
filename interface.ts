export interface Address {
    building_number: string;
    street?: string;
    district?: string;
    province: string;
    postal_code: string;
}

export interface HotelData {
    id: string;
    name: string;
    address: Address;
    tel: string;
    image?: string;
}

export interface Hotel {
    count: number;
    data: HotelData[];
}

export interface User {
    id: string;
    name: string;
    tel: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}

export interface BookingData {
    id: string;
    start_date: string;
    end_date: string;
    hotel: HotelData;
    user: User;
}

export interface Booking {
    count: number;
    data: BookingData[];
}

export interface AuthResponse {
    user: User;
    token: string;
    bookingCount?: number;
}
