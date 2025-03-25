import { MapPin, PenLine, Phone, Trash2 } from "lucide-react";
import React from "react";
import HotelCard from "./HotelCard";
import { HotelData } from "../../interface";


interface ManageHotelCardProps {
    hotel: HotelData;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

function ManageHotelCard({ hotel, onEdit, onDelete }: ManageHotelCardProps) {
    
    return (
      <div className="w-100 p-6 ">
        {" "}
        {/* Adjusted width and padding */}
        <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg relative ">
          <HotelCard hotel={hotel}></HotelCard>
          <PenLine
            className="absolute top-2 right-2 cursor-pointer text-blue-500"
            onClick={() => {
              onEdit(hotel.id);
            }}
          />
          <Trash2
            className="absolute bottom-2 right-2 text-red-500 cursor-pointer"
            onClick={() => {
              onDelete(hotel.id);
            }}
          />
        </div>
      </div>
    );
}

export default ManageHotelCard;
