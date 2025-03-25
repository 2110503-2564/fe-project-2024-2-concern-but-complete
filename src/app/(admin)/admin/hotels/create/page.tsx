"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { HotelData } from "../../../../../../interface"; 
import HotelSettingsForm from "@/components/HotelSettingsForm"; 
import { ArrowLeft } from "lucide-react";
import { createHotel } from "@/libs/hotelService";
import { useSession } from "next-auth/react";

function CreateHotelPage() {
    const router = useRouter();
    const { hid } = useParams();
    const {data:session} = useSession();
    const [hotel] = useState<HotelData | undefined>(undefined);


  const handleCreate = async(updatedHotel: HotelData) => {
    console.log("Save updated hotel:", updatedHotel);
    const newHotel = await createHotel(updatedHotel, (session as any)?.token);
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
        <HotelSettingsForm hotel={hotel} onSave={handleCreate} title="Create Hotel" />
      </div>
    );
}

export default CreateHotelPage;
