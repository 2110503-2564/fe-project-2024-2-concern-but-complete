"use client";
import HotelSettingsForm from "@/components/HotelSettingsForm";
import { createHotel } from "@/libs/hotelService";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HotelData } from "../../../../../../interface";

function CreateHotelPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreate = async (updatedHotel: HotelData) => {
    console.log("Save updated hotel:", updatedHotel);
    await createHotel(updatedHotel, (session as any)?.token);
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
      <HotelSettingsForm onSave={handleCreate} title="Create Hotel" />
    </div>
  );
}

export default CreateHotelPage;
