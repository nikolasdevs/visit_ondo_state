import React from "react";
import HotelsHero from "@/components/where-to-stay/hotel/HotelHero";
import AllHotelServer from "@/components/where-to-stay/hotel/HotelsServer";

const Page = async () => {
  return (
    <div>
      <HotelsHero id={0} title={""} description={""} imageUrl={""} link={""} />
      <AllHotelServer />
    </div>
  );
};

export default Page;
