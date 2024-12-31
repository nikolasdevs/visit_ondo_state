"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Accommodation {
  id: string;
  name: string;
  description: string;
  imageUrls: string | null;
  type: string;
  slug: string;
}

export default function AllAccommodationClient() {
  const [data, setData] = useState<Accommodation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_ACCOMMODATIONS_API;
        if (!API_URL) {
          throw new Error("API URL is not defined");
        }
        const response = await axios.get(`${API_URL}`);
        console.log("Response from API:", response.data); // Log the API response
        if (response.data && Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data); // Log the unexpected data format
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
        setError("Failed to fetch accommodations");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data state updated:", data); // Log the updated data state
  }, [data]);

  const randomHotels = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const hotels = data.filter(
      (accommodation) => accommodation.type.toLowerCase() === "hotel"
    );
    console.log("Hotels data:", hotels); // Log the hotels data
    return shuffleAndSlice(hotels, 4);
  }, [data]);

  const randomAirbnb = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const airbnb = data.filter(
      (accommodation) => accommodation.type.toLowerCase() === "airbnb"
    );
    console.log("Airbnb data:", airbnb); // Log the Airbnb data
    return shuffleAndSlice(airbnb, 4);
  }, [data]);

  const randomApartments = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const apartments = data.filter(
      (accommodation) => accommodation.type.toLowerCase() === "apartment"
    );
    console.log("Apartments data:", apartments); // Log the apartments data
    return shuffleAndSlice(apartments, 4);
  }, [data]);

  const randomResorts = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const resorts = data.filter(
      (accommodation) => accommodation.type.toLowerCase() === "resort"
    );
    console.log("Resorts data:", resorts); // Log the resorts data
    return shuffleAndSlice(resorts, 4);
  }, [data]);

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && data && (
        <>
          <AccommodationSection
            title="Hotels"
            accommodations={randomHotels}
            moreLink="/where-to-stay/hotels/"
          />
          <AccommodationSection
            title="Airbnb"
            accommodations={randomAirbnb}
            moreLink="/where-to-stay/airbnb/"
          />
          <AccommodationSection
            title="Apartments"
            accommodations={randomApartments}
            moreLink="/where-to-stay/apartments/"
          />
          <AccommodationSection
            title="Resorts"
            accommodations={randomResorts}
            moreLink="/where-to-stay/resorts/"
          />
        </>
      )}
    </div>
  );
}

function shuffleAndSlice(
  array: Accommodation[],
  count: number
): Accommodation[] {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function AccommodationSection({
  title,
  accommodations,
  moreLink,
}: {
  title: string;
  accommodations: Accommodation[];
  moreLink: string;
}) {
  return (
    <div className="flex flex-col gap-8 container  w-full">
      <div className="text-primary-foreground font-semibold text-2xl bg-primary px-3 pe-6 py-4 flex justify-between items-center">
        <p>{title}</p>
        <Link
          href={moreLink}
          className="inline-flex items-center text-base font-medium text-center text-primary-foreground border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary-foreground"
        >
          More
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>{" "}
      <div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-center ">
        {accommodations.map((accommodation) => (
          <div
            key={accommodation.id}
            className="max-w-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700"
          >
            <Link
              href={`/where-to-stay/${title.toLowerCase()}/${
                accommodation.slug
              }`}
            >
              <motion.div
                initial={false}
                whileHover={{ scale: 1.1 }}
                className="relative w-full h-48"
                transition={{ duration: 0.3 }}
              >
                {accommodation.imageUrls &&
                accommodation.imageUrls.length > 0 ? (
                  <Image
                    src={accommodation.imageUrls[0]}
                    alt={accommodation.name}
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-700">
                    No Image Available
                  </div>
                )}
              </motion.div>
            </Link>

            <div className="mt-4 flex flex-col justify-between">
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-neutral-700 dark:text-white">
                {accommodation.name}
              </h3>
              <p className="mb-3 font-normal text-neutral-500 dark:text-gray-400">
                {accommodation.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
