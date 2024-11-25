import React from "react";
import map from "../../public/ondoMap2.svg";
import Image from "next/image";
import { Button } from "../ui/button";


const Hero = () => {
  return (
    <>
      <div className="w-full bgGradient ">
        <div className="relative  h-screen flex items-center  max-w-7xl   mx-auto px-2 sm:px-6 lg:px-8">
          {" "}
          <div className="absolute right-0 w-1/2 sm:visible invisible ">
            <Image src={map} className=" w-[100%] " alt="Map" />{" "}
          </div>
          <div className=" text-neutral-600 flex flex-col items-center sm:items-start justify-between w-full">
            <div className="flex flex-col gap-8 items-center sm:items-start text-center sm:text-start w-4/6 ">
              <p className="2xl:text-[10rem] xl:text-[8rem] lg:text-[6rem] text-[4rem] 2xl:leading-[9rem] xl:leading-[7rem] lg:leading-[5rem] font-black font-display z-10 leading-[4rem]  ">
                EXPLORE ONDO STATE
              </p>{" "}
              <p className=" text-2xl leading-[2rem] font-semibold z-10">
                Get ready to explore Ondo State. <br /> Discover the best
                sights, events, entertainments, culture with few clicks away...
              </p>
            </div>
            <div className="mt-8 w-full flex items-center sm:justify-start justify-center">
              {" "}
              <Button className="px-6 font-semibold text-lg">
                DISCOVER
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
