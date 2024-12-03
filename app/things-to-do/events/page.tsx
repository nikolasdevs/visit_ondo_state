import React from "react";
import ApartmentHero from "@/components/where-to-stay/apartment/ApartmentHero";
import AllApartmentServer from "@/components/where-to-stay/apartment/ApartmentsServer";

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
      <AllApartmentServer />
    </div>
  );
};

export default Page;
