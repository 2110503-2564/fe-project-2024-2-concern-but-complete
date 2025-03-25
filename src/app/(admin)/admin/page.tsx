"use client";
import { getHotels } from "@/libs/hotelService";
import { ArrowRight, Building, Calendar, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Booking, Hotel } from "../../../../interface";
import { getBookings } from "@/libs/bookingService";
import { useSession } from "next-auth/react";

function AdminDashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  const [hotels, setHotels] = useState<Hotel>();
  const [bookings, setBookings] = useState<Booking>();
  useEffect(() => {
    let hotelResponse: Hotel;
    let bookingResponse: Booking;
    const fetchHotels = async () => {
      hotelResponse = await getHotels();
    };
    const fetchBookings = async () => {
      bookingResponse = await getBookings((session as any)?.token);
    };
    Promise.all([fetchBookings(), fetchHotels()]).then(() => {
      setHotels(hotelResponse);
      setBookings(bookingResponse);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-8 mx-auto ">
      <h1 className="text-4xl font-bold  ml-10">Admin Dashboard</h1>
      <p className="text-lg ml-10">Manage hotels and bookings</p>
      <div className="flex gap-6 justify-center mt-10 ">
        {/* Hotels Card */}
        <div className="w-1/3 bg-white h-60 p-6 rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.2)] flex flex-col justify-between mr-30">
          <div>
            <h2 className="text-3xl font-semibold mb-1 flex items-center gap-2">
              <Building className="w-8 h-8 text-blue-500" />
              Hotels
            </h2>
            <div className="space-y-3  ">
              <p className="text-sm   ">manage hotel listings</p>
              <p className="text-3xl font-bold ">{hotels?.count}</p>
              <p className="text-sm">Total hotels in system</p>
            </div>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 flex items-center justify-center gap-2"
            onClick={() => router.push("/admin/hotels")}
          >
            <span>Manage Hotels</span>
            <ArrowRight />
          </button>
        </div>

        {/* Bookings Card */}
        <div className="w-1/3 bg-white h-60 p-6 rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.2)] flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-1 flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-500" />
              Booking
            </h2>
            <div className="space-y-3">
              <p className="text-sm">manage booking listings</p>
              <p className="text-3xl font-bold">{bookings?.count}</p>
              <p className="text-sm">Total bookings in system</p>
            </div>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 flex items-center justify-center gap-2"
            onClick={() => router.push("/admin/bookings")}
          >
            <span>Manage Bookings</span>
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
