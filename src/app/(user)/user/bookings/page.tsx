import ManageBookings from '@/components/ManageBooking';
import UserNavigate from '@/components/UserNavigate';
import React from 'react'

function Booking() {
  return (
    <div className="flex bg-white">
      <UserNavigate />
      <div className=" p-2 w-2/3">
        <ManageBookings />
      </div>
    </div>
  );
}

export default Booking