"use client";

import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import "../../../../components/embla/embla2.css";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplayProgress } from "@/components/embla/emblaCarouselAutoplayProgress";
import { useAutoplay } from "@/components/embla/emblaCarouselAutoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/embla/ArrowBtns";
import { Pause, Play } from "lucide-react";

type PropType = {
  // slides: number[];
  images: string[];
  options?: EmblaOptionsType;
};
const HotelCarouselClient: React.FC<PropType> = (props) => {
  const { images, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ]);
  useEffect(() => {
    return () => {
      // Cleanup Embla API instance on unmount
      emblaApi?.destroy();
    };
  }, [emblaApi]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div
              key={index}
              className="embla__slide relative w-full h-96 -z-[5000]"
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? "" : " embla__progress--hidden"
          )}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </div>

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? <Pause /> : <Play color="white" />}
        </button>
      </div>
    </div>
  );
};

export default HotelCarouselClient;
