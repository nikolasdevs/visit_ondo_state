import prisma from "@/lib/db";
import AllThingsToDoClient from "./AllThingsToDoClient";

async function FetchAllThingsToDoServer() {
  const tourism = await prisma.tourism.findMany();
  const event = await prisma.event.findMany();
  const nightlife = await prisma.nightlife.findMany();
  const foodDrinks = await prisma.food_Drink.findMany();
  const shopping = await prisma.shopping.findMany();

  return { tourism, event, nightlife, foodDrinks, shopping };
}

export default async function AllThingsToDoServer() {
  const data = await FetchAllThingsToDoServer();
  return <AllThingsToDoClient data={data} />;
}
