import AllResorts from "@/components/where-to-stay/resort/AllResorts";
import ResortsHero from "@/components/where-to-stay/resort/ResortHero";

import React from "react";

const Page = async () => {
  return (
    <div>
      <ResortsHero id={0} title={""} description={""} imageUrl={""} link={""} />
      <AllResorts />
    </div>
  );
};

export default Page;
