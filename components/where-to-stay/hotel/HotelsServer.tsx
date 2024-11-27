import prisma from "@/lib/db";
import Link from "next/link";
import AllHotelsClient from "./HotelsClient";

async function FetchAllHotelServer() {
  const hotels = await prisma.accommodation.findMany({
    where: {
      type: "HOTEL",
    },
  });

  return { hotels };
}

export default async function AllHotelServer() {
  const data = await FetchAllHotelServer();
  return <AllHotelsClient data={data} />;
}
