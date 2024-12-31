import React from "react";
import HotelsHero from "@/components/where-to-stay/hotel/HotelHero";
import AllHotels from "@/components/where-to-stay/hotel/AllHotels";


const Page = async () => {
  return (
    <div>
      <HotelsHero id={0} title={""} description={""} imageUrl={""} link={""} />
      <AllHotels />
    </div>
  );
};

export default Page;
