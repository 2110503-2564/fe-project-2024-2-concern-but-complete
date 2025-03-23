import { Calendar, MapPin } from "lucide-react"; // Import the relevant icons

interface BookingCardProps {
  hotelName: string;
  checkIn: string;
  checkOut: string;
  location: string;
  onViewDetails: () => void;
  onCancel: () => void;
}

function BookingCard({
  hotelName,
  checkIn,
  checkOut,
  location,
  onViewDetails,
  onCancel,
}: BookingCardProps) {
  return (
    <div className="w-85 p-4 text-black">
      <div className="bg-white p-6 rounded-lg shadow-[0_0_5px_0_rgba(0,0,0,0.3)]">
        <h3 className="font-bold text-xl mb-2">{hotelName}</h3>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Check-in: {checkIn}</span>
          </div>
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Check-out: {checkOut}</span>
          </div>
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{location}</span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={onViewDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            View Details
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
