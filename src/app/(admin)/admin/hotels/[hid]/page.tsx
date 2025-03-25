"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { HotelData } from "../../../../../../interface";
import HotelSettingsForm from "@/components/HotelSettingsForm";
import { ArrowLeft } from "lucide-react";
import { getHotel, updateHotel } from "@/libs/hotelService";
import { useSession } from "next-auth/react";

function EditHotelPage({ params }: { params: Promise<{ hid: string }> }) {
  const {data:session} = useSession();
  const router = useRouter();
  const unwrappedParams = use(params);
  const [hotel, setHotel] = useState<HotelData | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const hotelResponse = await getHotel(unwrappedParams.hid);
      setHotel(hotelResponse);
    };
    fetchHotel();
  }, [unwrappedParams.hid]);

  const handleEdit = (updatedHotel: HotelData) => {
    updateHotel(unwrappedParams.hid, updatedHotel, (session as any)?.token);
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
      <HotelSettingsForm hotel={hotel} onSave={handleEdit} title="Edit Hotel" />
    </div>
  );
}

export default EditHotelPage;
