"use client";
import React, { useState, useEffect } from "react";
import BookingCard from "./BookingCard";
import { useRouter } from "next/navigation";
import { BookingData } from "../../interface";

function ManageBookings() {
    const [bookings, setBookings] = useState<BookingData[]>([
        {
            id: "1",
            start_date: "2024-09-10",
            end_date: "2024-09-12",
            hotel: {
                id: "h1",
                name: "Chabatai Hotel1",
                address: {
                    building_number: "123",
                    street: "Main St",
                    district: "District 1",
                    province: "Bangkok",
                    postal_code: "10100",
                },
                tel: "123456789",
            },
            user: {
                id: "u1",
                name: "John Doe",
                tel: "987654321",
                email: "john@example.com",
                password: "password",
                role: "user",
            },
        },
        {
            id: "2",
            start_date: "2024-09-11",
            end_date: "2024-09-12",
            hotel: {
                id: "h2",
                name: "Chabatai Hotel2",
                address: {
                    building_number: "124",
                    street: "Second St",
                    district: "District 2",
                    province: "Bangkok",
                    postal_code: "10200",
                },
                tel: "123456780",
            },
            user: {
                id: "u2",
                name: "Jane Doe",
                tel: "987654320",
                email: "jane@example.com",
                password: "password",
                role: "user",
            },
        },
    ]);

    const router = useRouter();

    const handleViewDetails = (id: string) => {
        alert(`Viewing details for booking with ID: ${id}`);
        router.push(`/bookings/${id}`);
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
                        hotelName={booking.hotel.name}
                        checkIn={booking.start_date}
                        checkOut={booking.end_date}
                        location={`${booking.hotel.address.district}, ${booking.hotel.address.province}`}
                        onViewDetails={() => handleViewDetails(booking.id)}
                        onCancel={() => handleCancel(booking.id)}
                    />
                ))}
            </div>
        </div>
    );
}
export default ManageBookings;
