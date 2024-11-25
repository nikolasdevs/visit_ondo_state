import prisma from "@/lib/db";
import Link from "next/link";
import AllAccommodationClient from "./AllAccommodationClient";

async function FetchAllAccommodationServer() {
  const hotels = await prisma.accommodation.findMany({
    where: {
      type: "HOTEL",
    },
  });
  const motels = await prisma.accommodation.findMany({
    where: {
      type: "MOTEL",
    },
  });
  const apartments = await prisma.accommodation.findMany({
    where: {
      type: "APARTMENT",
    },
  });

  return { hotels, motels, apartments };
}

export default async function AllAccommodationServer() {
  const data = await FetchAllAccommodationServer();
  return <AllAccommodationClient data={data} />;
}
