import prisma from "@/lib/db";
import AllAccommodationClient from "./AllAccommodationClient";

async function FetchAllAccommodationServer() {
  const hotels = await prisma.accommodation.findMany({
    where: {
      type: "HOTEL",
    },
  });
  const airbnb = await prisma.accommodation.findMany({
    where: {
      type: "AIRBNB",
    },
  });
  const apartments = await prisma.accommodation.findMany({
    where: {
      type: "APARTMENT",
    },
  });
  const resorts = await prisma.accommodation.findMany({
    where: {
      type: "RESORT",
    },
  });

  return { hotels, airbnb, apartments, resorts };
}

export default async function AllAccommodationServer() {
  const data = await FetchAllAccommodationServer();
  return <AllAccommodationClient data={data} />;
}
