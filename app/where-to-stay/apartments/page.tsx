import React from "react";
import ApartmentHero from "@/components/where-to-stay/apartment/ApartmentHero";
import AllApartments from "@/components/where-to-stay/apartment/AllApartments";

const Page = async () => {
  return (
    <div>
      <ApartmentHero
        id={0}
        title={""}
        description={""}
        imageUrl={""}
        link={""}
      />
      <AllApartments />
    </div>
  );
};

export default Page;
