import prisma from "@/lib/db";
import AllShoppingClient from "./ShoppingsClient";

async function FetchAllShoppingServer() {
  const resorts = await prisma.shopping.findMany();

  return { resorts };
}

export default async function AllShoppingServer() {
  const data = await FetchAllShoppingServer();
  return <AllShoppingClient data={data} />;
}
