// import prisma from "@/lib/db";
// import CategoriesClient from "./CategoriesClient";

// async function fetchCategories() {
//   const accommodations = await prisma.accommodation.findMany();
//   const tourisms = await prisma.tourism.findMany();
//   const events = await prisma.event.findMany();
//   const nightlifes = await prisma.nightlife.findMany();
//   const foodDrinks = await prisma.food_Drink.findMany();
//   const shoppings = await prisma.shopping.findMany();

//   return {
//     accommodations,
//     tourisms,
//     events,
//     foodDrinks,
//     shoppings,
//     nightlifes,
//   };
// }

// export default async function Categories() {
//   const data = await fetchCategories();
//   return <CategoriesClient data={data} />;
// }
