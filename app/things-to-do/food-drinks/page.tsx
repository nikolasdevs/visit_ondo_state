import ResortsHero from "@/components/where-to-stay/resort/ResortHero";
import AllResortServer from "@/components/where-to-stay/resort/ResortsServer";
import React from "react";

const Page = async () => {
  return (
    <div>
      <ResortsHero id={0} title={""} description={""} imageUrl={""} link={""} />
      <AllResortServer />
    </div>
  );
};

export default Page;
