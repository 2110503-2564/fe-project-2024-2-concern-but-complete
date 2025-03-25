'use client'
import React from 'react'
import { HotelData } from '../../interface'
import { useRouter } from 'next/navigation'
import { MapPin, Phone } from 'lucide-react'

function HotelCard({hotel}:{hotel:HotelData}) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/hotels/${hotel.id}`)
    }
    const addressText = hotel.address ? `${hotel.address.street}, ${hotel.address.district}, ${hotel.address.province} ${hotel.address.postalcode}`: "No address info";
  return (
    <div className="w-full h-full bg-white text-black rounded-lg shadow-md overflow-hidden" onClick={handleClick}>
      <div className="relative h-52 bg-gray-600">
        {/* <img
          src={hotel.image}
          alt="hotel"
          className="w-full h-full object-cover"
        /> */}
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{hotel.name}</h2>
        <div className="flex items-center mb-2">
          <MapPin />
          <span className="ml-2">{addressText}</span>
        </div>
        <div className="flex items-center">
          <Phone />
          <span className="ml-2">{hotel.tel}</span>
        </div>
      </div>
    </div>
    
  )
}

export default HotelCard