"use client";
import React, { useState } from "react";
import { Hotel } from "../../interface";

interface HotelSettingsFormProps {
  hotel: Hotel;
  onSave: (hotel: Hotel) => void;
}

function HotelSettingsForm({ hotel, onSave }: HotelSettingsFormProps) {
  const [hotelName, setHotelName] = useState(hotel.name);
  const [buildingNumber, setBuildingNumber] = useState(
    hotel.address.building_number
  );
  const [street, setStreet] = useState(hotel.address.street || "");
  const [district, setDistrict] = useState(hotel.address.district || "");
  const [province, setProvince] = useState(hotel.address.province);
  const [postalCode, setPostalCode] = useState(hotel.address.postal_code);
  const [tel, setTel] = useState(hotel.tel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHotel: Hotel = {
      ...hotel,
      name: hotelName,
      address: {
        building_number: buildingNumber,
        street,
        district,
        province,
        postal_code: postalCode,
      },
      tel,
    };
    onSave(updatedHotel); // Call the onSave function to pass the updated hotel data
  };

  return (
    <div className="w-250 mx-auto m-10 p-6 bg-white rounded-lg shadow-[0_0_3px_0_rgba(0,0,0,0.4)]">
      <h1 className="text-4xl font-bold text-center mb-6">Edit Hotel</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="hotelName" className="block text-lg font-semibold">
            Hotel Name
          </label>
          <input
            type="text"
            id="hotelName"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="w-full p-2 border-2 border-blue-300 rounded-md"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="mb-4">
            <label
              htmlFor="buildingNumber"
              className="block text-lg font-semibold"
            >
              Building Number
            </label>
            <input
              type="text"
              id="buildingNumber"
              value={buildingNumber}
              onChange={(e) => setBuildingNumber(e.target.value)}
              className="w-full p-2 border-2 border-blue-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="street" className="block text-lg font-semibold">
              Street
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-2 border-2 border-blue-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="district" className="block text-lg font-semibold">
              District
            </label>
            <input
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2 border-2 border-blue-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="province" className="block text-lg font-semibold">
              Province
            </label>
            <input
              type="text"
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full p-2 border-2 border-blue-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-lg font-semibold">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-2 border-2 border-blue-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tel" className="block text-lg font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              id="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="w-full p-2 border-2 border-blue-300 rounded-md"
            />
          </div>
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

export default HotelSettingsForm;
