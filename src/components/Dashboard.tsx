import { Calendar, UserRoundCog } from "lucide-react";
import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-col p-8 mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-sky-800">Dashboard</h1>

      <div className="flex gap-6">
        {/* Profile Card */}
        <div className="bg-white flex-1 h-70 p-6 rounded-lg shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-sky-800">Profile</h2>
            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>Name of user</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>useremail@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span>012-345-6789</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Role:</span>
                <span>user</span>
              </div>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-sky-800 text-white rounded hover:bg-sky-700 flex items-center justify-center gap-2">
            <UserRoundCog />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bookings Card */}
        <div className="bg-white flex-1 h-70 p-6 rounded-lg shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-sky-800">
              Bookings
            </h2>
            <div className="space-y-4 text-slate-700 ">
              <p className="text-sm text-slate-500  ">
                manage booking listings
              </p>
              <p className="text-3xl font-bold text-slate-700">7</p>
              <p className="text-sm text-slate-500">Total bookings in system</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-sky-800 text-white rounded hover:bg-sky-700 flex items-center justify-center gap-2">
            <Calendar />
            <span>Manage Bookings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
