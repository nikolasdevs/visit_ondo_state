import React from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import HotelsHero from "@/components/where-to-stay/hotel/HotelHero";
import AllHotelServer from "@/components/where-to-stay/hotel/HotelsServer";

const Page = async () => {
  const hotels = await prisma.accommodation.findMany({
    where: {
      type: "HOTEL",
    },
  });

  return (
    <div>
      <HotelsHero id={0} title={""} description={""} imageUrl={""} link={""} />
      <AllHotelServer />
    </div>
  );
};

export default Page;
