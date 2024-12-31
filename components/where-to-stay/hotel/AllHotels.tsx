"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";
import PaginationSection from "@/components/Pagination";

interface Accommodation {
  id: string;
  name: string;
  description: string;
  imageUrls: string | null;
  type: string;
  slug: string;
}

export default function AllHotels() {
  const [hotels, setHotels] = useState<Accommodation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = hotels.slice(firstItemIndex, lastItemIndex);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_ACCOMMODATIONS_API;
        if (!API_URL) {
          throw new Error("API URL is not defined");
        }
        const response = await axios.get(`${API_URL}/type/hotel`);
        console.log("Response from API:", response.data); // Log the API response
        if (response.data && Array.isArray(response.data.data)) {
          setHotels(response.data.data);
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

  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto px-8 gap-8 w-full mt-16">
        <div className="flex flex-col gap-8  w-full">
          <div className="  grid gap-8 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 justify-center">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="max-w-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden h-auto"
              >
                <Link href={`/where-to-stay/hotels/${hotel.slug}`} className="">
                  <div className="w-full h-64 bg-green-400 relative overflow-hidden">
                    {" "}
                    {/* Added relative and overflow-hidden */}
                    <motion.div
                      initial={false}
                      whileHover={{ scale: 1 }} // Slightly zooms in the entire div
                      className="w-full h-full" // Ensure it takes full width and height
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={false}
                        animate={{}}
                        className="relative w-full h-full" // Ensure it takes full width and height
                        whileHover={{ scale: [null, 1.1] }}
                        transition={{ duration: 0.3 }}
                      >
                        {hotel.imageUrls && hotel.imageUrls.length > 0 ? (
                          <Image
                            src={hotel.imageUrls[0]}
                            alt={hotel.name}
                            layout="fill"
                            objectFit="cover" // This ensures the image covers the entire area
                            className="absolute inset-0" // Makes the image fill the container
                            // placeholder="blur"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-700">
                            No Image Available
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </Link>{" "}
                <div className="pt-2 flex flex-col justify-between h-32 gap-2">
                  <div className="flex flex-col gap-2 ">
                    <Link href={`/where-to-stay/hotels/${hotel.slug}`}>
                      <h5 className=" text-neutral-700 font-bold text-xl dark:text-white">
                        {hotel.name}
                      </h5>
                    </Link>

                    <p className="text-base text-neutral-500 dark:text-gray-400 truncates">
                      {hotel.description}
                    </p>
                  </div>
                  <Link
                    href={`/where-to-stay/hotels/${hotel.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary"
                  >
                    More
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className=" sticky bottom-0 bg-primary-foreground py-4 border-t-2 border-y-white">
            <PaginationSection
              totalItems={hotels.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
