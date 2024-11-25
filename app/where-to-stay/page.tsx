import Hero from "@/components/where-to-stay/WhereToStayHero";
import AllAccommodation from "@/components/where-to-stay/AllAccommodationServer";

export default async function Accommodation() {
  return (
    <div>
      <Hero />
      <AllAccommodation />
    </div>
  );
}
