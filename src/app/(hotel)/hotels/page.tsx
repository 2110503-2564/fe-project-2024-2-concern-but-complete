import HotelCard from "@/components/HotelCard";
import SearchBarHotelsPage from "@/components/SearchBarHotelsPage";
import React from "react";
import { Hotel } from "../../../../interface";
import { getHotels } from "@/libs/hotelService";

export default async function HotelsPage() {
  // const hotels: Hotel[] = [
  //   {
  //     id: "1",
  //     name: "Hotel 1",
  //     tel: "123456789",
  //     address: {
  //       building_number: "1234",
  //       street: "1234 Street",
  //       district: "District",
  //       province: "Province",
  //       postal_code: "12345",
  //     },
  //   },
  //   {
  //     id: "2",
  //     name: "Hotel 2",
  //     tel: "123456789",
  //     address: {
  //       building_number: "1234",
  //       street: "1235 Street",
  //       district: "District",
  //       province: "Province",
  //       postal_code: "12345",
  //     },
  //   },
  //   {
  //     id: "3",
  //     name: "Hotel 3",
  //     tel: "123456789",
  //     address: {
  //       building_number: "1234",
  //       street: "1236 Street",
  //       district: "District",
  //       province: "Province",
  //       postal_code: "12345",
  //     },
  //   },
  //   {
  //     id: "4",
  //     name: "Hotel 4",
  //     tel: "123456789",
  //     address: {
  //       building_number: "1234",
  //       street: "1236 Street",
  //       district: "District",
  //       province: "Province",
  //       postal_code: "12345",
  //     },
  //   },
  // ];

  const hotels = await getHotels() as unknown as { data: Hotel[] };

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
          hotels.data.map((hotel:Hotel,index) => (
            <HotelCard key={index} hotel={hotel} />
          ))
        }
      </div>
    </main>
  );
}
