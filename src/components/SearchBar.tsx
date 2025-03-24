'use client'
import { TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { blueOutlineTextField } from "./utils/textFieldOutline";
import { searchSizeRespond } from "./utils/searchBarSizeResponsive";
import { useRouter } from "next/navigation";

export default function SearchBar({ onHomePage = false }) {
  const [hotel, setHotel] = useState("");
  const [province, setProvince] = useState("");
  const router = useRouter();

  const handleSearch = (e:FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (hotel) params.append("hotel", hotel);
    if (province) params.append("province", province);
    
    if (onHomePage) {
      router.push(`/hotels?${params.toString()}`);
    } else {
      router.push(`/hotels?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
      <TextField
        label="Hotel Name"
        name="hotel"
        variant="outlined"
        value={hotel}
        onChange={(e) => setHotel(e.target.value)}
        sx={{
          ...blueOutlineTextField,
          ...searchSizeRespond
        }}
      />
      <TextField
        label="Province"
        name="province"
        variant="outlined"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        sx={{
          ...blueOutlineTextField,
          ...searchSizeRespond
        }}
      />
      <button
        type="submit"
        className="
          bg-blue-400 
          text-white 
          font-semibold 
          rounded-md 
          px-5 
          py-2
          shadow 
          hover:bg-blue-600 
          transition
        "
        style={{
          height: "auto",
          minWidth: "120px",
        }}
      >
        Search
      </button>
    </form>
  );
}