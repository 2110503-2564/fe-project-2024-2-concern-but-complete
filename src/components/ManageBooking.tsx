"use client";
import React, { useState, useEffect } from "react";
import BookingCard from "./BookingCard";
import { useRouter } from "next/navigation";
import { BookingData } from "../../interface";
import { useSession } from "next-auth/react";
import { getBookings } from "@/libs/bookingService";

function ManageBookings() {
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const {data: session} = useSession();

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await getBookings((session as any)?.token);
            setBookings((oldBookings) => {
                return response.data;
            });
        }
        fetchBookings();
    }, []);

    const router = useRouter();

    const handleViewDetails = (id: string) => {
        router.push(`/bookings/${id}`);
    };

    const handleCancel = (id: string) => {
        setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking.id !== id)
        );
        
    };

    return (
        <div className="p-6 pl-15">
            <h1 className="text-3xl font-bold mb-6 text-black">Manage Bookings</h1>
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
