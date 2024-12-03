"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Img1 from "@/public/Img3.jpg";
import Img2 from "@/public/Img4.jpg";
import Img3 from "@/public/nature-8.jpg";
import Img4 from "@/public/nature-2.jpg";
import Img5 from "@/public/nature-5.jpg";
import Img6 from "@/public/nature-7.jpg";
import { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import "../../embla/emblaHotel.css";
import { ArrowRight } from "lucide-react";
import { DotButton, useDotButton } from "@/components/embla/DotBtn";
import { NextButton, PrevButton, usePrevNextButtons } from "@/components/embla/ArrowBtns";

interface HotelSlides {
  id: number;
  title: string;
  description: string;
  imageUrl: StaticImageData | string;
  link: string;
}

const hotelslides: HotelSlides[] = [
  {
    id: 1,
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    imageUrl: Img1,
    link: "#",
  },
  {
    id: 2,
    title: "Top startups to watch in 2024",
    description:
      "These are the most promising startups to keep an eye on in the upcoming year.",
    imageUrl: Img2,
    link: "#",
  },
  {
    id: 3,
    title: "Top startups to watch in 2024",
    description:
      "These are the most promising startups to keep an eye on in the upcoming year.",
    imageUrl: Img3,
    link: "#",
  },
  {
    id: 4,
    title: "Top startups to watch in 2024",
    description:
      "These are the most promising startups to keep an eye on in the upcoming year.",
    imageUrl: Img4,
    link: "#",
  },
  {
    id: 5,
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    imageUrl: Img5,
    link: "#",
  },
  {
    id: 6,
    title: "Top startups to watch in 2024",
    description:
      "These are the most promising startups to keep an eye on in the upcoming year.",
    imageUrl: Img6,
    link: "#",
  },
];

const HotelsHero: React.FC<HotelSlides> = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="embla h-screen relative overflow-hidden">
        <div className="embla_viewport" ref={emblaRef}>
          <div className="embla_container flex">
            {hotelslides.map((card) => (
              <div
                key={card.id}
                className="embla_slide flex-[0_0_100%] overflow-hidden relative "
              >
                <div className=" h-screen">
                  <Link href={card.link} className=" overflow-hidden">
                    {" "}
                    <Image
                      className="w-full"
                      src={card.imageUrl}
                      alt={card.title}
                    />{" "}
                  </Link>{" "}
                </div>
                <div className="p-10 flex flex-col justify-between bg-orange-400/75 absolute bottom-48 w-2/6 left-0 right-0 heroCardShadow">
                  {" "}
                  <Link href={card.link}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-neutral-700 dark:text-white">
                      {card.title}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-neutral-500 dark:text-gray-400">
                    {card.description}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-center text-primary"
                  >
                    More
                    <ArrowRight width={20} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls w-full">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelsHero;
