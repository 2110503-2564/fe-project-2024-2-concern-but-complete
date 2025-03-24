"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { HotelData } from "../../../../../../interface"; 
import HotelSettingsForm from "@/components/HotelSettingsForm"; 
import { ArrowLeft } from "lucide-react";

function CreateHotelPage() {
    const router = useRouter();
    const { hid } = useParams();
    const [hotel, setHotel] = useState<HotelData | undefined>(undefined);


    const handleSave = (updatedHotel: HotelData) => {
        console.log("Hotel updated:", updatedHotel);
    };


    return (
      <div>
        {/* Back to Admin Dashboard Button */}
        <button
          onClick={() => router.back()}
          className="text-blue-500 text-xl cursor-pointer bg-transparent border-none pt-10 pl-20 flex items-center"
        >
          <ArrowLeft className="w-5 mr-2" />
          <span>Back</span>
        </button>
        <HotelSettingsForm hotel={hotel} onSave={handleSave} title="Create Hotel"/>
      </div>
    );
}

export default CreateHotelPage;
