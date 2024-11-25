import React from "react";
import prisma from "@/lib/db";

const HotelById = async ({ params }) => {
  const hotel = await prisma.accommodation.findUnique({
    where: { type: "HOTEL", slug: params.slug },
  });

  return (
    <div>
      <li className="list-none">
        <p>{hotel?.title}</p>
        <p>{hotel?.address}</p>
      </li>
    </div>
  );
};

export default HotelById;
