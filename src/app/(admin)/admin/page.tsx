'use client'
import { ArrowRight, Building, Calendar, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function AdminDashboard() {
    const router = useRouter(); 
    
    const handleClick = (buttonLabel: string, route: string) => {
        alert(`You clicked on: ${buttonLabel}`);
        router.push(route); 
    };
        
    return (
      <div className="min-h-screen bg-white flex flex-col p-8 mx-auto ">
        <h1 className="text-4xl font-bold  text-sky-800 ml-10">
          Admin Dashboard
        </h1>
        <p className="text-lg text-slate-700 ml-10">
          Manage hotels and bookings
        </p>
        <div className="flex gap-6 justify-center mt-10 ">
          {/* Hotels Card */}
          <div className="w-1/3 bg-white h-60 p-6 rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.2)] flex flex-col justify-between mr-30">
            <div>
              <h2 className="text-3xl font-semibold mb-1 text-sky-800 flex items-center gap-2">
                <Building className="w-8 h-8" />
                Hotels
              </h2>
              <div className="space-y-3 text-slate-700 ">
                <p className="text-sm text-slate-500  ">
                  manage hotel listings
                </p>
                <p className="text-3xl font-bold text-slate-700">5</p>
                <p className="text-sm text-slate-500">Total hotels in system</p>
              </div>
            </div>
            <button
              className="w-full px-4 py-2 bg-sky-800 text-white rounded hover:bg-sky-700 flex items-center justify-center gap-2"
              onClick={() => handleClick("manage hotel", "/admin/hotels")}
            >
              <span>Manage Hotels</span>
              <ArrowRight />
            </button>
          </div>

          {/* Bookings Card */}
          <div className="w-1/3 bg-white h-60 p-6 rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.2)] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-semibold mb-1 text-sky-800 flex items-center gap-2">
                <Calendar className="w-8 h-8" />
                Booking
              </h2>
              <div className="space-y-3 text-slate-700 ">
                <p className="text-sm text-slate-500  ">
                  manage booking listings
                </p>
                <p className="text-3xl font-bold text-slate-700">7</p>
                <p className="text-sm text-slate-500">
                  Total bookings in system
                </p>
              </div>
            </div>
            <button
              className="w-full px-4 py-2 bg-sky-800 text-white rounded hover:bg-sky-700 flex items-center justify-center gap-2"
              onClick={() => handleClick("manage booking", "/admin/bookings")}
            >
              <span>Manage Bookings</span>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
}

export default AdminDashboard;
