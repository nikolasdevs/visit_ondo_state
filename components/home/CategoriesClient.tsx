// CategoriesClient.tsx (Client Component)
"use client";

import { useState } from "react";
import "../embla/embla.css";
import { NextButton, PrevButton, usePrevNextButtons } from "../embla/ArrowBtns";
import useEmblaCarousel from "embla-carousel-react";
import { CategoryType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Accommodation {
  id: string;
  title: string;
  imageUrls: string[] | null;
  category: CategoryType;
  slug: string;
}
interface Tourism {
  id: string;
  title: string;
  imageUrls: string[] | null;
  category: CategoryType;
  slug: string;
}
interface Event {
  id: string;
  title: string;
  imageUrls: string[] | null;
  category: CategoryType;
  slug: string;
}
interface FoodDrink {
  id: string;
  title: string;
  imageUrls: string[] | null;
  category: CategoryType;
  slug: string;
}
interface Nightlife {
  id: string;
  title: string;
  imageUrls: string[] | null;
  category: CategoryType;
  slug: string;
}
interface Shopping {
  id: string;
  title: string;
  imageUrls: string[] | null;
  category: CategoryType;
  slug: string;
}

interface Data {
  accommodations: Accommodation[];
  tourisms: Tourism[];
  events: Event[];
  foodDrinks: FoodDrink[];
  nightlifes: Nightlife[];
  shoppings: Shopping[];
}

export default function CategoriesClient({ data }: { data: Data }) {
  const [filter, setFilter] = useState("all");
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const filteredData =
    filter === "all"
      ? data
      : {
          accommodations:
            filter === "accommodations" ? data.accommodations : [],
          tourisms: filter === "tourisms" ? data.tourisms : [],
          events: filter === "events" ? data.events : [],
          foodDrinks: filter === "foodDrinks" ? data.foodDrinks : [],
          nightlifes: filter === "nightlifes" ? data.nightlifes : [],
          shoppings: filter === "shoppings" ? data.shoppings : [],
        };

  return (
    <div className="md:my-20 my-10">
      <section className="max-w-7xl mx-auto flex flex-col px-8">
        <div className="flex flex-col md:flex-row w-full relative gap-6 border-y-2 border-y-primary py-10">
          <div className="  font-semibold flex flex-col  text-neutral-500 md:w-4/12 w-full bg-transparent z-20 p-4">
            <div className="flex flex-col gap-4 ">
              <p className=" text-xl text-neutral-600 tracking-normal font-bold">
                What are you looking for?
              </p>
              <div className="sm:text-[32px] text-2xl sm:leading-9 leading-6 tracking-tighter flex gap-2 flex-wrap  ">
                {[
                  "all",
                  "accommodations",
                  "tourisms",
                  "nightlifes",
                  "events",
                  "foodDrinks",
                  "shoppings",
                ].map((type) => (
                  <p
                    key={type}
                    className="hover:text-neutral-600 cursor-pointer capitalize"
                    onClick={() => setFilter(type)}
                  >
                    {type}
                  </p>
                ))}
              </div>
            </div>
            <p className="text-base text-primary tracking-normal mt-10">
              More about
            </p>{" "}
          </div>
          <div className="embla__viewport w-11/12 mx-auto" ref={emblaRef}>
            <div className="embla__container flex ">
              {filteredData.accommodations.map((accommodation) => (
                <div
                  className="embla__slide flex  h-full w-full"
                  key={accommodation.id}
                >
                  <Link
                    href={`/where-to-stay/hotels/${accommodation.slug}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="embla__slide__image">
                      {accommodation.imageUrls &&
                      accommodation.imageUrls.length > 0 ? (
                        <Image
                          src={accommodation.imageUrls[0]}
                          alt={accommodation.title}
                          width={0}
                          height={0}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full "
                        />
                      ) : (
                        <div className="w-full h-full">No Image Available</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[.1rem] ">
                      <p className="font-bold">{accommodation.title}</p>
                      <p className="font-medium">
                        {" "}
                        {accommodation.category.charAt(0).toUpperCase() +
                          accommodation.category.toLowerCase().slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
              {filteredData.tourisms.map((tourism) => (
                <div className="embla__slide" key={tourism.id}>
                  <Link
                    href={`/things-to-do/tourism/${tourism.slug}`}
                    className=" flex flex-col gap-2"
                  >
                    <div className="embla__slide__image bg-red-200">
                      {tourism.imageUrls && tourism.imageUrls.length > 0 ? (
                        <Image
                          src={tourism.imageUrls[0]}
                          alt={tourism.title}
                          width={0}
                          height={0}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full">No Image Available</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[.1rem]">
                      <p className="font-bold"> {tourism.title}</p>
                      <p className="font-medium">
                        {" "}
                        {tourism.category.charAt(0).toUpperCase() +
                          tourism.category.toLowerCase().slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}

              {filteredData.nightlifes.map((nightlife) => (
                <div className="embla__slide" key={nightlife.id}>
                  <Link
                    href={`/things-to-do/hotels/${nightlife.slug}`}
                    className=" flex flex-col gap-2"
                  >
                    <div className="embla__slide__image bg-red-200">
                      {nightlife.imageUrls && nightlife.imageUrls.length > 0 ? (
                        <Image
                          src={nightlife.imageUrls[0]}
                          alt={nightlife.title}
                          width={0}
                          height={0}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full">No Image Available</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[.1rem]">
                      <p className="font-bold"> {nightlife.title}</p>
                      <p className="font-medium">
                        {" "}
                        {nightlife.category.charAt(0).toUpperCase() +
                          nightlife.category.toLowerCase().slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}

              {filteredData.events.map((event) => (
                <div className="embla__slide" key={event.id}>
                  <Link
                    href={`/things-to-do/hotels/${event.slug}`}
                    className=" flex flex-col gap-2"
                  >
                    <div className="embla__slide__image bg-red-200">
                      {event.imageUrls && event.imageUrls.length > 0 ? (
                        <Image
                          src={event.imageUrls[0]}
                          alt={event.title}
                          width={0}
                          height={0}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full">No Image Available</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[.1rem]">
                      <p className="font-bold"> {event.title}</p>
                      <p className="font-medium">
                        {" "}
                        {event.category.charAt(0).toUpperCase() +
                          event.category.toLowerCase().slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}

              {filteredData.foodDrinks.map((foodDrink) => (
                <div className="embla__slide" key={foodDrink.id}>
                  <Link
                    href={`/things-to-do/hotels/${foodDrink.slug}`}
                    className=" flex flex-col gap-2"
                  >
                    <div className="embla__slide__image bg-red-200">
                      {foodDrink.imageUrls && foodDrink.imageUrls.length > 0 ? (
                        <Image
                          src={foodDrink.imageUrls[0]}
                          alt={foodDrink.title}
                          width={0}
                          height={0}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full">No Image Available</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[.1rem]">
                      <p className="font-bold"> {foodDrink.title}</p>
                      <p className="font-medium">
                        {" "}
                        {foodDrink.category.charAt(0).toUpperCase() +
                          foodDrink.category.toLowerCase().slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}

              {filteredData.shoppings.map((shopping) => (
                <div className="embla__slide" key={shopping.id}>
                  <Link
                    href={`/things-to-do/hotels/${shopping.slug}`}
                    className=" flex flex-col gap-2"
                  >
                    <div className="embla__slide__image bg-red-200">
                      {shopping.imageUrls && shopping.imageUrls.length > 0 ? (
                        <Image
                          src={shopping.imageUrls[0]}
                          alt={shopping.title}
                          width={0}
                          height={0}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full">No Image Available</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[.1rem]">
                      <p className="font-bold"> {shopping.title}</p>
                      <p className="font-medium">
                        {" "}
                        {shopping.category.charAt(0).toUpperCase() +
                          shopping.category.toLowerCase().slice(1)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="embla__controls ">
              <div className="embla__buttons w-full md:justify-end justify-between flex">
                <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                />
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                />
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </div>
  );
}
