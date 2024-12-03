"use client";

import React from "react";

import { motion, useScroll } from "framer-motion";

const Hero = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <div className="bg-[url('/hotel.png')] bg-cover bg-center h-screen flex items-center justify-start ">
        <div className="w-full  container">
          <motion.div
            className="progress-bar"
            style={{ scaleX: scrollYProgress }}
          />
          <div className="w-4/6 flex items-center ">
            <div className=" flex flex-col   gap-4 w-4/6 text-white">
              <p className="text-lg lg:text-7xl font-black font-display">
                Things to do in Lagos State
              </p>
              <p className=" text-4xl font-bold">
                Luxury hotel or B&B, in the Old Towns or in the City : Lagos
                State has suitable experience for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
