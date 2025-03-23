import { MapPin, PenLine, Phone, Trash2 } from "lucide-react";
import React from "react";

interface Hotel {
    id: string;
    name: string;
    address: string;
    phone: string;
    image: string; // Hotel image (could be a URL or path)
}

interface ManageHotelCardProps {
    hotel: Hotel;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

function ManageHotelCard({ hotel, onEdit, onDelete }: ManageHotelCardProps) {
    return (
        <div className="w-90 p-6"> {/* Adjusted width and padding */}
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg relative">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-60 object-cover" 
                />
                <PenLine
                    className="absolute top-2 right-2 text-white cursor-pointer"
                    onClick={() => {
                        alert('Edit button clicked');
                        onEdit(hotel.id);
                    }}
                />
                <div className="p-6 "> {/* Adjusted padding */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{hotel.name}</h3>
                    <p className="text-gray-600 flex items-center mb-2">
                        <MapPin className="mr-2" />
                        {hotel.address}
                    </p>
                    <p className="text-gray-600 flex items-center mb-2">
                        <Phone className="mr-2" />
                        {hotel.phone}
                    </p>
                </div>
                <Trash2
                    className="absolute bottom-2 right-2 text-red-500 cursor-pointer"
                    onClick={() => {
                        alert('Delete button clicked');
                        onDelete(hotel.id);
                    }}
                />
            </div>
        </div>
    );
}

export default ManageHotelCard;
