"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";
import PaginationSection from "@/components/Pagination";

interface Tourism {
  id: string;
  title: string;
  description: string;
  imageUrls: string[] | null;
  slug: string;
}

interface Data {
  tours: Tourism[];
}

export default function AllTourismClient({ data }: { data: Data }) {
  const [tours] = useState<Tourism[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto px-8 gap-8 w-full mt-16">
        <div className="flex flex-col gap-8  w-full">
          <div className="  grid gap-8 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 justify-center">
            {data.tours.map((tour) => (
              <div
                key={tour.id}
                className="max-w-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden h-auto"
              >
                <Link href={`/things-to-do/tours/${tour.slug}`} className="">
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
                        {tour.imageUrls && tour.imageUrls.length > 0 ? (
                          <Image
                            src={tour.imageUrls[0]}
                            alt={tour.title}
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
                    <Link href={`/things-to-do/tours/${tour.slug}`}>
                      <h5 className=" text-neutral-700 font-bold text-xl dark:text-white">
                        {tour.title}
                      </h5>
                    </Link>

                    <p className="text-base text-neutral-500 dark:text-gray-400 truncates">
                      {tour.description}
                    </p>
                  </div>
                  <Link
                    href={`/things-to-do/tours/$tours.slug}`}
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
              totalItems={tours.length}
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
