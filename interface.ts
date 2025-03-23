export interface Address {
  building_number: string;
  street?: string;
  district?: string;
  province: string;
  postal_code: string;
}

export interface Hotel {
  id: string;
  name: string;
  address: Address;
  tel: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  tel: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  hotel: Hotel;
  user: User;
}

export interface AuthResponse {
  user: User;
  token: string;
}
