import HotelCard from "@/components/HotelCard";
import SearchBarHotelsPage from "@/components/SearchBarHotelsPage";
import React from "react";
import { HotelData } from "../../../../interface";
import { getHotels } from "@/libs/hotelService";

export default async function HotelsPage() {

  const hotels = await getHotels();

  return (
    <main
      className="
        rounded-md
        w-full
        p-6
        bg-white
        min-h-screen
        box-border
      "
    >
      <SearchBarHotelsPage />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {
          hotels.data.map((hotel:HotelData,index) => (
            <HotelCard key={index} hotel={hotel} />
          ))
        }
      </div>
    </main>
  );
}