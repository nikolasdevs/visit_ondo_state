import prisma from "@/lib/db";
import AllFoodDrinkClient from "./FoodDrinkClient";

async function FetchAllFoodDrinkServer() {
  const foodDrink = await prisma.accommodation.findMany();

  return { foodDrink };
}

export default async function AllFoodDrinkServer() {
  const data = await FetchAllFoodDrinkServer();
  return <AllFoodDrinkClient data={data} />;
}
