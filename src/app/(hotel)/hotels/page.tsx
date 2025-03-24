'use client'
import HotelCard from "@/components/HotelCard";
import React, { useEffect, useState } from "react";
import { Hotel, HotelData } from "../../../../interface";
import { getHotels } from "@/libs/hotelService";
import SearchBar from "@/components/SearchBar";
import { useSearchParams } from "next/navigation";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel>({count:0, data:[]});
  const [filteredHotels, setFilteredHotels] = useState<HotelData[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchHotel = async () => {
      const hotelsResponse = await getHotels();
      setHotels(hotelsResponse);
      
      filterHotels(hotelsResponse.data);
    }
    fetchHotel();
  }, []);
  
  useEffect(() => {
    filterHotels(hotels.data);
  }, [searchParams, hotels.data]);
  
  const filterHotels = (hotelsData: HotelData[]) => {
    if (!hotelsData || hotelsData.length === 0) return;
    
    const hotelName = searchParams.get('hotel');
    const province = searchParams.get('province');
    
    if (!hotelName && !province) {
      setFilteredHotels(hotelsData);
      return;
    }
    
    const filtered = hotelsData.filter(hotel => {
      const matchesName = !hotelName || hotel.name.toLowerCase().includes(hotelName.toLowerCase());
      const matchesProvince = !province || 
        (hotel.address.province && hotel.address.province.toLowerCase().includes(province.toLowerCase()));
      
      return matchesName && matchesProvince;
    });
    
    setFilteredHotels(filtered);
  };

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
      <div className="rounded-lg w-full p-4">
        <SearchBar onHomePage={false} />
      </div>
      
      {/* Display search results summary if filtering is active */}
      {(searchParams.get('hotel') || searchParams.get('province')) && (
        <div className="p-4">
          <h2 className="text-lg font-semibold">
            Search Results: {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
          </h2>
          {searchParams.get('hotel') && (
            <p className="text-sm text-gray-600">Hotel name: "{searchParams.get('hotel')}"</p>
          )}
          {searchParams.get('province') && (
            <p className="text-sm text-gray-600">Province: "{searchParams.get('province')}"</p>
          )}
        </div>
      )}
      
      {/* Hotel grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel: HotelData, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500">No hotels found matching your search criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}