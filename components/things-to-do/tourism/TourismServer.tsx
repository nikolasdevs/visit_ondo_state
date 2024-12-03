import prisma from "@/lib/db";
import AllTourismClient from "./TourismClient";

async function FetchAllTourismServer() {
  const tours = await prisma.tourism.findMany();

  return { tours };
}

export default async function AllTourismServer() {
  const data = await FetchAllTourismServer();
  return <AllTourismClient data={data} />;
}
