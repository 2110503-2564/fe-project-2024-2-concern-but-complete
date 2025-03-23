import React from 'react'

async function getHotels() {
  const response = await fetch('https://crappy-cbc-backend.vercel.app/api/v1/hotels')
  if(!response.ok) {
    throw new Error('Failed to fetch hotels')
  }
  return await response.json()
}

export default getHotels
