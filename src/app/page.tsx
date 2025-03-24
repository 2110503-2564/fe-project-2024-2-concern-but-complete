import HotelCard from "@/components/HotelCard";
import { Hotel } from "../../interface";
import {
  ArrowRightCircle,
  Calendar,
  Hotel as HotelIcon,
  Search,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const Banner = () => {
  return (
    <div className="relative h-[500px] w-full">
      <Image
        src="/img/banner.jpg"
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 brightness-60"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find the perfect hotel for your next adventure
        </h1>
        <p className="text-lg md:text-2xl">
          Discover the best accommodations for your needs with CBC
        </p>
      </div>
    </div>
  );
};

const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Triamudom",
    address: {
      building_number: "123",
      street: "burger",
      district: "samyan",
      province: "bangkok",
      postal_code: "12341",
    },
    tel: "099-999-9999",
  },
  {
    id: "1",
    name: "Triamudom",
    address: {
      building_number: "123",
      street: "burger",
      district: "samyan",
      province: "bangkok",
      postal_code: "12341",
    },
    tel: "099-999-9999",
  },
  {
    id: "1",
    name: "Triamudom",
    address: {
      building_number: "123",
      street: "burger",
      district: "samyan",
      province: "bangkok",
      postal_code: "12341",
    },
    tel: "099-999-9999",
  },
  {
    id: "1",
    name: "Triamudom",
    address: {
      building_number: "123",
      street: "burger",
      district: "samyan",
      province: "bangkok",
      postal_code: "12341",
    },
    tel: "099-999-9999",
  },
];

const SellPointCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center w-auto bg-white p-4 rounded-md shadow-bg shadow-lg">
      <div className="text-primary rounded-full p-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-start text-wrap">{description}</p>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <div className="relative mb-28 sm:mb-10">
        <Banner />
        <SearchBar />
      </div>
      <section className="text-center p-6">
        <h2 className="text-3xl font-bold mb-4">Why Choose CBC</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience a seamless booking process and enjoy premium accommodations
          tailored to your needs.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-4">
          <SellPointCard
            title="Curated Selection"
            description="Handpicked hotels that meet our high standards for comfort and service."
            icon={<HotelIcon size={48} />}
          />
          <SellPointCard
            title="Flexible Booking"
            description="Easy booking process with the ability to manage your reservations."
            icon={<Calendar size={48} />}
          />
          <SellPointCard
            title="Simple Discovery"
            description="Find the perfect hotel for your needs with our intuitive search system."
            icon={<Search size={48} />}
          />
        </div>
      </section>
      <section className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sample Hotels</h2>
          <Link
            href={"/"}
            className="bg-white px-3 py-2 rounded-lg border-2 border-slate-300 hover:bg-slate-300 transition-colors"
          >
            View All Hotels →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHotels.slice(0, 3).map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>
      </section>
      <footer className="bg-primary text-bg flex flex-col items-center py-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-lg mb-6">
          Create an account now to unlock the full experience and start booking
          your perfect stay.
        </p>
        <button className="flex items-center bg-bg text-text px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
          Sign-up Now
          <ArrowRightCircle className="ml-2" />
        </button>
      </footer>
    </main>
  );
}
