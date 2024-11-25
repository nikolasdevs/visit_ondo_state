import React from "react";
import prisma from "@/lib/db";

const ApartmentById = async ({ params }) => {
  const apartment = await prisma.accommodation.findUnique({
    where: { type: "APARTMENT", slug: params.slug },
  });

  return (
    <div>
      <li className="list-none">
        <p>{apartment?.title}</p>
        <p>{apartment?.address}</p>
      </li>
    </div>
  );
};

export default ApartmentById;
