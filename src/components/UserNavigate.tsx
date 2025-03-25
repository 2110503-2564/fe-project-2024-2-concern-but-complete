'use client'
import Image from 'next/image';
import { Calendar, House, LogOut, SquareUser } from "lucide-react";
import React from 'react';
import { useRouter } from 'next/navigation'; 
import NavigateBtn from './NavigateBtn';
import { signOut, useSession } from 'next-auth/react';

function UserNavigate() {
  const router = useRouter(); 

  const handleClick = (route: string) => {
    router.push(route); 
  };
  const {data: session} = useSession();
  return (
    <div className="w-1/4 h-[515px] relative flex flex-col items-center m-6 ">
      <div className="w-44 h-44 overflow-hidden rounded-full">
        <Image
          src="/img/mockProfile.jpg"
          alt="Profile"
          width={176}
          height={176}
          className="object-cover"
        />
      </div>
      <div className="mt-2 justify-start text-3xl font-semibold mb-10">
        {session?.user?.name}
      </div>
      <div className="flex flex-col rounded-2xl">
        {/* Dashboard Button - Navigates to /user */}
        <NavigateBtn
          icon={<House className="w-5 mr-4" />}
          label="Dashboard"
          onClick={() => handleClick("/user")}
        />
        {/* Profile Button - Navigates to /user/profile */}
        <NavigateBtn
          icon={<SquareUser className="w-5 mr-4" />}
          label="Profile Settings"
          onClick={() => handleClick("/user/profile")}
        />
        {/* Manage Bookings Button */}
        <NavigateBtn
          icon={<Calendar className="w-5 mr-4" />}
          label="Manage Bookings"
          onClick={() => handleClick("/user/bookings")}
        />
        {/* Log Out Button - Navigates to the main page */}
        <NavigateBtn
          icon={<LogOut className="w-5 mr-4" />}
          label="Log Out"
          onClick={() =>signOut({callbackUrl: '/'})} 
        />
      </div>
    </div>
  );
}

export default UserNavigate;