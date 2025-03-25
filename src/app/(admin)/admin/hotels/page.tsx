"use client";
import ManageHotelCard from "@/components/ManageHotelCard";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Hotel, HotelData } from "../../../../../interface";
import { deleteHotel, getHotels } from "@/libs/hotelService";
import { useSession } from "next-auth/react";

function Hotels() {
  const router = useRouter();
  const session = useSession();

  const [hotels, setHotels] = useState<HotelData[]>([]);
  useEffect(() => {
    const fetchHotels = async () => {
      const hotelResponse = await getHotels();
      setHotels(hotelResponse.data);
    };
    fetchHotels();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit hotel with id:", id);
    router.push(`/admin/hotels/${id}`);
  };

  const handleDelete = async (id: string) => {
   const isConfirmed = window.confirm(
     "Are you sure you want to cancel this booking?"
   );
   console.log(session.data?.user?.token);
   console.log((session as any)?.token);
   if (isConfirmed) {
     try {
       await deleteHotel(id, session.data?.user?.token);
       setHotels((prevHotels) => {
         return prevHotels.filter( (hotels)=> hotels.id !== id);
       });
     } catch (error) {
       console.log("Error delete hotel:", error);
     }
   }
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
        {hotels.map((hotel: HotelData, index: number) => (
          <ManageHotelCard
            key={index}
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
