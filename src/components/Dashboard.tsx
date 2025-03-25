"use client";
import { Calendar, UserRoundCog } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AuthResponse } from "../../interface";
import { getCurrentUser } from "@/libs/authService";

function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<any>(undefined);

  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin");
    }
    
    const fetchUser = async () => {
      const user = await getCurrentUser((session as any)?.token);
      setUserProfile(user);
    };
    fetchUser();

  }, []);

  const handleClick = (buttonLabel: string, route: string) => {
    alert(`You clicked on: ${buttonLabel}`);
    router.push(route);
  };

  return (
  (userProfile &&
    <div className="flex flex-col p-8 mx-auto">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="flex gap-6">
        {/* Profile Card */}
        <div className="bg-white flex-1 h-70 p-6 rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.2)] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 ">Profile</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{userProfile.data.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{userProfile.data.user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span>{userProfile.data.user.tel}</span>
              </div>
            </div>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={() => handleClick("edit Profile", "/user/profile")}
          >
            <UserRoundCog />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bookings Card */}
        <div className="bg-white flex-1 h-70 p-6 rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.2)] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 ">Bookings</h2>
            <div className="space-y-4  ">
              <p className="text-sm  ">manage booking listings</p>
              <p className="text-3xl font-bold ">{userProfile.data.bookingCount}</p>
              <p className="text-sm ">Your bookings in system</p>
            </div>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={() => handleClick("manage booking", "/user/bookings")}
          >
            <Calendar />
            <span>Manage Bookings</span>
          </button>
        </div>
      </div>
    </div>
  ));
}

export default Dashboard;
