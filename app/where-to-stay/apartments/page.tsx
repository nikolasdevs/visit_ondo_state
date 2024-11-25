import React from "react";
import Link from "next/link";
import prisma from "@/lib/db";

const Page = async () => {
  const hotels = await prisma.accommodation.findMany({
    where: {
      type: "APARTMENT",
    },
  });

  return (
    <div>
      {hotels.map((apartment) => (
        <li key={apartment.id} className="list-none">
          <Link href={`/where-to-stay/apartments/${apartment.slug}`}>
            {apartment.title}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Page;
