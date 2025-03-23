import React from "react";

async function getHotel(id: string) {
  const response = await fetch(
    `https://crappy-cbc-backend.vercel.app/api/v1/hotels/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch hotel");
  }
  return await response.json();
}

export default getHotel;
