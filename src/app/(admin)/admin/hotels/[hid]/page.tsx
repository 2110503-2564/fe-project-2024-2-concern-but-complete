"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { HotelData } from "../../../../../../interface"; 
import HotelSettingsForm from "@/components/HotelSettingsForm"; 
import { ArrowLeft } from "lucide-react";

function EditHotelPage() {
    const router = useRouter();
    const { hid } = useParams();
    const [hotel, setHotel] = useState<HotelData | null>(null);

    useEffect(() => {
        if (hid) {
            const fetchedHotel = {
                id: hid as string,
                name: "Hotel " + hid,
                tel: "123456789",
                address: {
                    building_number: "1234",
                    street: "Street " + hid,
                    district: "District",
                    province: "Province",
                    postal_code: "12345",
                },
            };
            setHotel(fetchedHotel);
        }
    }, [hid]);

    const handleSave = (updatedHotel: HotelData) => {
        console.log("Hotel updated:", updatedHotel);
    };

    if (!hotel) {
        return <div>Loading...</div>;
    }

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
        <HotelSettingsForm hotel={hotel} onSave={handleSave} />
      </div>
    );
}

export default EditHotelPage;
