"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import DateReserve from "@/components/DateReserve";

export default function HotelDetailPage({ params }: { params: { hotelid: string } }) {
  const session = "null";

  const hotel = {
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
  };

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleStartDateChange = (date: Dayjs) => {
    setStartDate(date);
    
    if (endDate) {
      if (endDate.isBefore(date) || endDate.diff(date, 'day') > 3) {
        setEndDate(null);
      }
    }
  };

  const handleEndDateChange = (date: Dayjs) => {
    if (startDate && date.diff(startDate, 'day') <= 3) {
      setEndDate(date);
    }
  };

  const isStartDateDisabled = (date: Dayjs) => {
    return date.isBefore(dayjs(), 'day');
  };

  const isEndDateDisabled = (date: Dayjs) => {
    if (date.isBefore(dayjs(), 'day') || date.isBefore(startDate, 'day')) {
      return true;
    }
    if (startDate && date.diff(startDate, 'day') > 3) {
      return true;
    }
    
    return false;
  };

  const addressText = hotel.address
    ? `${hotel.address.street}, ${hotel.address.district}, ${hotel.address.province} ${hotel.address.postal_code}`
    : "No address info";

  return (
    <main className="min-h-screen p-6">
      <div>
        <Link href="/hotels" className="text-blue-500 hover:underline">
          &larr; Back to Hotels
        </Link>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
          <div className="w-full h-[300px] bg-gray-300 rounded-3xl text-gray-700 flex items-center justify-center mb-4 md:w-4xl md:h-[500px]">
            pic
          </div>
          <div className="flex items-center mb-3">
            <MapPin />
            <span className="text-gray-700 text-lg font-medium ml-4">{addressText}</span>
          </div>
          <div className="flex items-center">
            <Phone />
            <span className="text-gray-700 mt-2 text-lg font-medium ml-4">{hotel.tel}</span>
          </div>
        </div>

        {session ? (
          // logged in
          <div className="border border-gray-300 bg-gray-100 rounded-2xl py-4 px-12 w-full md:w-[400px] md:h-3/5 md:mr-52">
            <h2 className="text-xl font-semibold mb-4">Book your hotel</h2>
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-sm font-medium">Check-in</p>
              <DateReserve
                onDateChange={handleStartDateChange}
                selectedDate={startDate}
                shouldDisableDate={isStartDateDisabled}
              />
              <p className="text-sm font-medium mt-4">Check-out</p>
              <DateReserve
                onDateChange={handleEndDateChange}
                selectedDate={endDate}
                disableBeforeDate={startDate}
                shouldDisableDate={isEndDateDisabled}
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full mb-4">
              Confirm Booking
            </button>
            <p className="text-sm text-gray-500">Note: You can book up to 3 nights per hotel.</p>
          </div>
        ) : (
          // not logged in
          <div className="border border-gray-300 bg-gray-100 rounded-2xl py-4 px-10 w-full md:w-[400px] md:h-52 md:mr-52">
            <h2 className="text-xl font-semibold mb-4">Book your hotel</h2>
            <p className="mb-4 text-gray-400">Please login to book this hotel</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-xl w-full mb-2">
              Login
            </button>
            <button className="border border-gray-300 bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-xl w-full">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </main>
  );
}