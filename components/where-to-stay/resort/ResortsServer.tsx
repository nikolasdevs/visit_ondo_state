import prisma from "@/lib/db";
import AllResortsClient from "./ResortsClient";

async function FetchAllResortServer() {
  const resorts = await prisma.accommodation.findMany({
    where: {
      type: "RESORT",
    },
  });

  return { resorts };
}

export default async function AllResortServer() {
  const data = await FetchAllResortServer();
  return <AllResortsClient data={data} />;
}
