"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve";
import { getBookingById, updateBooking } from "@/libs/bookingService";
import { useSession } from "next-auth/react";
import { BookingData } from "../../../../../interface";

function calculateNights(checkIn: string, checkOut: string): number {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.floor(daysDifference);
}

export default function BookingDetailPage({
  params,
}: {
  params: { bid: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [booking, setBooking] = useState<BookingData>();

  useEffect(() => {
    const fetchDetails = async () => {
      const bookingDetails = await getBookingById(
        params.bid,
        (session as any)?.token
      );
      setBooking(bookingDetails);
    };
    fetchDetails();
  }, []);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleStartDateChange = (date: Dayjs) => {
    setStartDate(date);
    if (endDate && (endDate.isBefore(date) || endDate.diff(date, "day") > 3)) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date: Dayjs) => {
    if (startDate && date.diff(startDate, "day") <= 3) {
      setEndDate(date);
    }
  };

  const handleUpdateBookingDate = async () => {
    if (startDate && endDate) {
      const response = await updateBooking(
        params.bid,
        startDate.add(1, "day").toISOString(),
        endDate.add(1, "day").toISOString(),
        (session as any)?.token
      );
      response && setBooking((prevBooking) => {
        if (!prevBooking) return prevBooking;
        return {
          ...prevBooking,
          start_date: startDate.add(1, "day").toISOString(),
          end_date: endDate.add(1, "day").toISOString(),
        };
      });
    }
  };

  const isStartDateDisabled = (date: Dayjs) => {
    return date.isBefore(dayjs(), "day"); // Disable past dates
  };

  const isEndDateDisabled = (date: Dayjs) => {
    if (date.isBefore(dayjs(), "day") || date.isBefore(startDate, "day")) {
      return true;
    }
    if (startDate && date.diff(startDate, "day") > 3) {
      return true;
    }
    return false;
  };

  if (!booking) {
    return <div>Loading...</div>; // Show loading state until the booking data is available
  }

  return (
    <main className="bg-white p-10">
      <div>
        <button
          onClick={() => router.back()}
          className="text-blue-500 text-sm cursor-pointer bg-transparent border-none flex"
        >
          <ArrowLeft className="w-5 mr-2" />
          <span className="flex items-center">{"Back to Manage Bookings"}</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold my-5 ">Booking Details</h1>

      <div className="flex justify-between">
        <div className="w-3/4">
          <div className="info-section shadow-[0_0_3px_0_rgba(0,0,0,0.2)] p-5 rounded-xl mr-5 h-45 ">
            <h3 className="text-2xl font-semibold mb-3">Hotel Information</h3>
            <p className=" mb-2 text-lg flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              <strong>{booking.hotel.name}</strong>
            </p>
            <p className=" mb-2 text-lg flex">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{`${booking.hotel.address.district}, ${booking.hotel.address.province}`}</span>
            </p>
            <p className=" mb-2 text-lg flex">
              <Phone className="w-5 h-5 mr-2" />
              <span>{booking.user.tel}</span>
            </p>
          </div>
          <div className="flex justify-between h-50">
            <div className="info-section m-5 ml-0 w-1/2 shadow-[0_0_3px_0_rgba(0,0,0,0.2)] p-5 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Stay Details</h3>
              <p className="mb-1 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <strong className="mr-1">Check-in:</strong>{" "}
                {booking.start_date.slice(0, 10)}
              </p>
              <p className="mb-1 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <strong className="mr-1">Check-out:</strong>{" "}
                {booking.end_date.slice(0, 10)}
              </p>
              <p className="mb-1 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <strong className="mr-1">Duration:</strong>{" "}
                {calculateNights(booking.start_date, booking.end_date)} Nights
              </p>
            </div>
            <div className="info-section m-5 ml-0 w-1/2 shadow-[0_0_3px_0_rgba(0,0,0,0.2)] p-5 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Guest Information</h3>
              <p className="flex items-center font-bold">
                <User className="w-5 h-5 mr-2 mb-2" />
                {booking.user.name}
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2 mb-2" />
                {booking.user.email}
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2 mb-2" />
                {booking.user.tel}
              </p>
            </div>
          </div>
        </div>

        <div className="w-70 p-5 rounded-xl shadow-[0_0_3px_0_rgba(0,0,0,0.2)] h-75">
          <h3 className="text-lg font-semibold ">Edit Booking</h3>
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
          <button
            className="save-btn bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700 w-full"
            onClick={handleUpdateBookingDate}
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}
