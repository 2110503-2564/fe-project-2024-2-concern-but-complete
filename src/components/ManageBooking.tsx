"use client";
import React, { useState, useEffect } from "react";
import BookingCard from "./BookingCard";
import { useRouter } from "next/navigation";
import { BookingData } from "../../interface";
import { useSession } from "next-auth/react";
import { deleteBooking, getBookings } from "@/libs/bookingService";

function ManageBookings() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookings((session as any)?.token);
      setBookings((oldBookings) => {
        return response.data;
      });
    };
    fetchBookings();
  }, []);

  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/bookings/${id}`);
  };

  const handleCancel = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (isConfirmed) {
      try {
        await deleteBooking(id, (session as any)?.token);
        setBookings((prevBookings) => {
          return prevBookings.filter((booking) => booking._id !== id);
        });
      } catch (error) {
        console.log("Error cancelling booking:", error);
      }
    }
  };

  return (
    <div className="p-6 pl-15">
      <h1 className="text-3xl font-bold mb-3 text-black">Manage Bookings</h1>
      <p className="text-lg text-gray-600 mb-6">manage booking listings</p>
      <div className="flex gap-6 flex-wrap ">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            hotelName={booking.hotel.name}
            checkIn={booking.start_date.slice(0, 10)}
            checkOut={booking.end_date.slice(0, 10)}
            location={`${booking.hotel.address.district}, ${booking.hotel.address.province}`}
            onViewDetails={() => handleViewDetails(booking._id)}
            onCancel={() => handleCancel(booking._id)}
          />
        ))}
      </div>
    </div>
  );
}
export default ManageBookings;
