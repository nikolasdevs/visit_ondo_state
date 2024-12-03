import prisma from "@/lib/db";
import AllEventClient from "./EventClient";

async function FetchAllEventServer() {
  const events = await prisma.event.findMany();

  return { events };
}

export default async function AllEventServer() {
  const data = await FetchAllEventServer();
  return <AllEventClient data={data} />;
}
