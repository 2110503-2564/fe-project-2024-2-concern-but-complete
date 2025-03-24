"use client";
import ManageHotelCard from "@/components/ManageHotelCard";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HotelData } from "../../../../../interface";

function Hotels() {
    const router = useRouter();

    // Initial list of hotels (this could come from an API in a real-world scenario)
    const [hotels, setHotels] = useState<HotelData[]>([
        {
          id: "1",
          name: "Hotel 1",
          tel: "123456789",
          address: {
            building_number: "1234",
            street: "1234 Street",
            district: "District",
            province: "Province",
            postal_code: "12345",
          },
        },
        {
          id: "2",
          name: "Hotel 2",
          tel: "123456789",
          address: {
            building_number: "1234",
            street: "1235 Street",
            district: "District",
            province: "Province",
            postal_code: "12345",
          },
        },
        {
          id: "3",
          name: "Hotel 3",
          tel: "123456789",
          address: {
            building_number: "1234",
            street: "1236 Street",
            district: "District",
            province: "Province",
            postal_code: "12345",
          },
        },
        {
          id: "4",
          name: "Hotel 4",
          tel: "123456789",
          address: {
            building_number: "1234",
            street: "1236 Street",
            district: "District",
            province: "Province",
            postal_code: "12345",
          },
        },
      ]
    );

    const handleEdit = (id: string) => {
        // Handle hotel edit (could navigate to a different page or show a modal)
        console.log("Edit hotel with id:", id);
        router.push(`/admin/hotels/${id}`);
    };

    const handleDelete = (id: string) => {
        // Remove the hotel from the list
        setHotels(hotels.filter((hotel) => hotel.id !== id));
    };

    const handleCreateHotel = () => {
      router.push("/admin/hotels/create");
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Back to Admin Dashboard Button */}
            <button
                onClick={() => router.push("/admin")}
                className="text-blue-500 text-sm cursor-pointer bg-transparent border-none pt-10 pl-20 flex items-center"
            >
                <ArrowLeft className="w-5 mr-2" />
                <span>Back to Admin Dashboard</span>
            </button>

            {/* Title */}
            <div className="p-4 pl-20 w-full text-3xl font-semibold my-4">
                Manage Hotels
            </div>

            {/* Create Hotel Button */}
            <div className="flex justify-end p-4">
                <button
                    onClick={handleCreateHotel}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Create Hotel
                </button>
            </div>

            {/* Hotel Cards List */}
            <div className="flex flex-wrap gap-6 px-15">
                {hotels.map((hotel) => (
                    <ManageHotelCard
                        key={hotel.id}
                        hotel={hotel}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Hotels;
