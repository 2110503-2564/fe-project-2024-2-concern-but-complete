"use client"
import ManageBookings from '@/components/ManageBooking';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import React from 'react'

function Booking() {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-white">
      <button
        onClick={() => router.push("/admin")}
        className="text-blue-500 text-sm cursor-pointer bg-transparent border-none pt-10 pl-17 flex"
      >
        <ArrowLeft className="w-5 mr-2" />
        <span className="flex items-center">{"Back to Admin Dashboard"}</span>
      </button>
      <div className=" p-2 w-full">
        <ManageBookings />
      </div>
    </div>
  );
}

export default Booking