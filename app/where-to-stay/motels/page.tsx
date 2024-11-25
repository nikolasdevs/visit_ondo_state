import React from "react";
import Link from "next/link";
import prisma from "@/lib/db";

const Page = async () => {
  const hotels = await prisma.accommodation.findMany({
    where: {
      type: "MOTEL",
    },
  });

  return (
    <div>
      {hotels.map((motel) => (
        <li key={motel.id} className="list-none">
          <Link href={`/where-to-stay/motels/${motel.slug}`}>{motel.title}</Link>
        </li>
      ))}
    </div>
  );
};

export default Page;
