"use client";
import React, { useState } from "react";

function ProfileSettingsForm() {
  const [email, setEmail] = useState("usermail@gmail.com");
  const [fullName, setFullName] = useState("Name of user");
  const [phone, setPhone] = useState("000-000-0000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile changes saved!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.4)] m-20">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">
        Profile Settings
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-black"
          >
            Email
          </label>
          <p className="text-black">{email}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-lg font-semibold text-black"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border-2 border-blue-300 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-lg font-semibold text-black"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border-2 border-blue-300 rounded-md text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileSettingsForm;
