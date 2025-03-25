"use client";
import { updateUser } from "@/libs/authService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SuccessfulPopup from "./SuccessfulPopup";

function ProfileSettingsForm({
  email,
  name,
  tel,
}: {
  email: string;
  name: string;
  tel: string;
}) {
  const [fullName, setFullName] = useState(name);
  const [phone, setPhone] = useState(tel);
  const router = useRouter();
  const { data: session } = useSession();
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: fullName, tel: phone }, (session as any)?.token).then(
      (res) => {
          setSuccessOpen(true);
      }
    );
  };

  const handleRedirect = () => {
    router.push('/user')
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.4)] m-20">
      <h1 className="text-4xl font-bold text-center mb-6">Profile Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold">
            Email
          </label>
          <p className="text-black">{email}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-lg font-semibold">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border-2 border-blue-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-lg font-semibold">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border-2 border-blue-300 rounded-md "
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
      <SuccessfulPopup
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        type="update"
        redirectAction={handleRedirect}
      />
    </div>
  );
}

export default ProfileSettingsForm;
