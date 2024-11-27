import prisma from "@/lib/db";
import CategoriesClient from "./CategoriesClient";

async function fetchCategories() {
  const accommodations = await prisma.accommodation.findMany();
  const tourisms = await prisma.tourism.findMany();

  return { accommodations, tourisms };
}

export default async function Categories() {
  const data = await fetchCategories();
  return <CategoriesClient data={data} />;
}
