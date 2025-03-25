"use client";
import ManageHotelCard from "@/components/ManageHotelCard";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal"; // New import
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Hotel, HotelData } from "../../../../../interface";
import { deleteHotel, getHotels } from "@/libs/hotelService";
import { useSession } from "next-auth/react";

function Hotels() {
  const router = useRouter();
  const session = useSession();

  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      const hotelResponse = await getHotels();
      setHotels(hotelResponse.data);
    };
    fetchHotels();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/hotels/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setHotelToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (hotelToDelete) {
      try {
        await deleteHotel(hotelToDelete, (session.data?.user as any)?.token);
        setHotels((prevHotels) => 
          prevHotels.filter((hotel) => hotel.id !== hotelToDelete)
        );
        setDeleteModalOpen(false);
      } catch (error) {
        console.log("Error delete hotel:", error);
      }
    }
  };

  const handleCreateHotel = () => {
    router.push("/admin/hotels/create");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <button
        onClick={() => router.push("/admin")}
        className="text-blue-500 text-sm cursor-pointer bg-transparent border-none pt-10 pl-20 flex items-center"
      >
        <ArrowLeft className="w-5 mr-2" />
        <span>Back to Admin Dashboard</span>
      </button>

      <div>
        <div>
          <div className="pt-10 pl-20 w-full text-3xl font-semibold ">
            Manage Hotels
          </div>
          <p className="p-4 pl-20 text-lg text-gray-600 mb-6">
            manage booking listings
          </p>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={handleCreateHotel}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Hotel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {hotels.map((hotel: HotelData, index: number) => (
          <ManageHotelCard
            key={index}
            hotel={hotel}
            onEdit={handleEdit}
            onDelete={() => handleDeleteClick(hotel.id)}
          />
        ))}
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName="this hotel"
      />
    </div>
  );
}

export default Hotels;