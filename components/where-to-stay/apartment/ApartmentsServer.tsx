import prisma from "@/lib/db";
import AllApartmentsClient from "./ApartmentsClient";

async function FetchAllApartmentServer() {
  const apartments = await prisma.accommodation.findMany({
    where: {
      type: "APARTMENT",
    },
  });

  return { apartments };
}

export default async function AllApartmentServer() {
  const data = await FetchAllApartmentServer();
  return <AllApartmentsClient data={data} />;
}
