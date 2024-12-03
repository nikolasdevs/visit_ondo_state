import prisma from "@/lib/db";
import AllNightlifeClient from "./NightlifeClient";

async function FetchAllNightlifeServer() {
  const nightlife = await prisma.nightlife.findMany();

  return { nightlife };
}

export default async function AllNightlifeServer() {
  const data = await FetchAllNightlifeServer();
  return <AllNightlifeClient data={data} />;
}
