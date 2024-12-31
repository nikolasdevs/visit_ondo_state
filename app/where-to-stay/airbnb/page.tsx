import React from "react";
import AllAirbnb from "@/components/where-to-stay/airbnb/AllAirbnb";
import AirbnbHero from "@/components/where-to-stay/airbnb/AirbnbHero";

const Page = async () => {
  return (
    <div>
      <AirbnbHero id={0} title={""} description={""} imageUrl={""} link={""} />
      <AllAirbnb />
    </div>
  );
};

export default Page;
