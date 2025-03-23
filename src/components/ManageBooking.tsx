"use client";
import React, { useState } from "react";
import BookingCard from "./BookingCard";
import { useRouter } from "next/navigation";

interface Booking {
    id: string;
    hotelName: string;
    checkIn: string;
    checkOut: string;
    location: string;
}

function ManageBookings() {
    const [bookings, setBookings] = useState<Booking[]>([
        {
            id: "1",
            hotelName: "Chabatai Hotel1",
            checkIn: "2024-09-10",
            checkOut: "2024-09-12",
            location: "Bangkok, Thailand",
        },
        {
            id: "2",
            hotelName: "Chabatai Hotel2",
            checkIn: "2024-09-11",
            checkOut: "2024-09-12",
            location: "Bangkok, Thailand",
        },
        {
            id: "3",
            hotelName: "Chabatai Hotel3",
            checkIn: "2024-09-10",
            checkOut: "2024-09-13",
            location: "Bangkok, Thailand",
        },
        {
            id: "4",
            hotelName: "Chabatai Hotel4",
            checkIn: "2024-09-11",
            checkOut: "2024-09-12",
            location: "Bangkok, Thailand",
        },
    ]);

    const router = useRouter();

    const handleViewDetails = (id: string) => {
        alert(`Viewing details for booking with ID: ${id}`);
        router.push(`/user/bookings/${id}`);
    };

    const handleCancel = (id: string) => {
        setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking.id !== id)
        );
        alert(`Booking with ID: ${id} has been canceled`);
    };

    return (
        <div className="p-6 pl-15">
            <h1 className="text-3xl font-bold mb-6 text-black">Manage Bookings</h1>
            <div className="flex gap-6 flex-wrap ">
                {bookings.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        hotelName={booking.hotelName}
                        checkIn={booking.checkIn}
                        checkOut={booking.checkOut}
                        location={booking.location}
                        onViewDetails={() => handleViewDetails(booking.id)}
                        onCancel={() => handleCancel(booking.id)}
                    />
                ))}
            </div>
        </div>
    );
}
export default ManageBookings;
