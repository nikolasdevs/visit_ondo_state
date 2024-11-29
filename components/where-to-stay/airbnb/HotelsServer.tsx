import prisma from "@/lib/db";
import AllAirBnbsClient from "./AirbnbsClient";

async function FetchAllAirBnbServer() {
  const airbnbs = await prisma.accommodation.findMany({
    where: {
      type: "AIRBNB",
    },
  });

  return { airbnbs };
}

export default async function AllAirBnbServer() {
  const data = await FetchAllAirBnbServer();
  return <AllAirBnbsClient data={data} />;
}
