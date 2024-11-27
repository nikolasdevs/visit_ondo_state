"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";
import PaginationSection from "@/components/Pagination";

interface Accommodation {
  id: string;
  title: string;
  description: string;
  imageUrls: string[] | null;
  type: string;
  slug: string;
}

interface Data {
  hotels: Accommodation[];
}

export default function AllHotelsClient({ data }: { data: Data }) {
  const [hotels, setHotels] = useState<Accommodation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = hotels.slice(firstItemIndex, lastItemIndex);
  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto px-8 gap-8 w-full mt-16">
        <div className="flex flex-col gap-8  w-full">
          <div className="  grid gap-8 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 justify-center">
            {data.hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="max-w-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden h-auto"
              >
                <Link href={`/where-to-stay/hotels/${hotel.slug}`} className="">
                  {" "}
                  <motion.div
                    initial={false}
                    whileHover={{ scale: 1 }} // Slightly zooms in the entire div
                    className="overflow-hidden " // Ensures the image remains within bounds
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={false}
                      animate={{}}
                      className=""
                      whileHover={{ scale: [null, 1.1] }}
                      transition={{ duration: 0.3 }}
                    >
                      {hotel.imageUrls && hotel.imageUrls.length > 0 ? (
                        <Image
                          src={hotel.imageUrls[0]}
                          alt={hotel.title}
                          width={400}
                          height={400}
                          className=""
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-700">
                          No Image Available
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </Link>{" "}
                <div className="pt-2 flex flex-col justify-between h-32 gap-2">
                  <div className="flex flex-col gap-2 ">
                    <Link href={`/where-to-stay/hotels/${hotel.slug}`}>
                      <h5 className=" text-neutral-700 font-bold text-xl dark:text-white">
                        {hotel.title}
                      </h5>
                    </Link>

                    <p className="text-base text-neutral-500 dark:text-gray-400">
                      {hotel.description}
                    </p>
                  </div>
                  <Link
                    href="#"
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
