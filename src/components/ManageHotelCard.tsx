import { PenLine, Trash2 } from "lucide-react";
import { HotelData } from "../../interface";
import HotelCard from "./HotelCard";


interface ManageHotelCardProps {
    hotel: HotelData;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

function ManageHotelCard({ hotel, onEdit, onDelete }: ManageHotelCardProps) {
    
    return (
      <div className="bg-gray-200 rounded-lg shadow-lg relative ">
        <div className="h-full w-full">
          <HotelCard hotel={hotel}></HotelCard>
        </div>

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
    );
}

export default ManageHotelCard;
