import React from "react";


const FindThings = () => {
  return (
    <>
      <div className="w-full bg-background relative">
        <div className="relative  h-screen flex items-center  max-w-7xl   mx-auto px-2 sm:px-6 lg:px-8">
          {" "}
          <div className="absolute right-0 w-full sm:visible invisible "></div>
          <div className=" text-neutral-600 flex flex-col items-center sm:items-start justify-between w-full">
            <div className="flex flex-col gap-8 items-center sm:items-start text-center sm:text-start w-full ">
              <p className="2xl:text-6xl text-4rem font-extrabold font-display z-10 text-foreground ">
                Find Things To Do in Lagos
              </p>{" "}
              <p className=" text-2xl leading-[2rem] font-semibold z-10 text-foreground">
                Get ready to explore Lagos State. <br /> Discover the best
                sights, events, entertainments, culture with few clicks away...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindThings;
