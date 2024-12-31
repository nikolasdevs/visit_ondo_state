"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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

interface Accommodation {
  id: string;
  name: string;
  description: string;
  address: string;
  imageUrls: string[];
}

interface ApartmentByIdProps {
  images: string[];
  options?: EmblaOptionsType;
}

const ApartmentById: React.FC<ApartmentByIdProps> = ({ images, options }) => {
  const [slug, setSlug] = useState<string | null>(null);
  const [data, setData] = useState<Accommodation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ]);

  // Fetch slug from the URL
  useEffect(() => {
    const slugFromUrl = window.location.pathname.split("/").pop();
    console.log("Extracted slug:", slugFromUrl);
    if (slugFromUrl) {
      setSlug(slugFromUrl);
    } else {
      setError("Slug not found in the URL");
      setLoading(false);
    }
  }, []);
  // Fetch accommodation data
  useEffect(() => {
    if (!slug) return;

    const fetchAccommodation = async () => {
      try {
        console.log("Fetching data for slug:", slug); // Log slug
        const response = await axios.get(
          `http://localhost:5001/api/accommodations/${slug}`
        );
        console.log("API Response:", response.data.data); // Log response
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch accommodation data:", error);
        setError("Failed to fetch accommodation data");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [slug]);

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

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!data) {
    return <p className="text-center">No data available</p>;
  }

  return (
    <>
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

          <button
            className="embla__play"
            onClick={toggleAutoplay}
            type="button"
          >
            {autoplayIsPlaying ? (
              <Pause className="text-primary-foreground" />
            ) : (
              <Play className="text-primary-foreground" />
            )}
          </button>
        </div>
      </div>
      <main className="w-full bg-primary-foreground mx-auto p-4 h-screen">
        <div className="max-w-7xl mx-auto top-48 relative">
          <div className="w-full px-8">
            <h1 className="text-6xl font-extrabold mb-6 text-primary">
              {data.name}
            </h1>
            <p className="text-3xl font-medium">{data.description}</p>
            <div className="flex w-full h-auto mt-8 gap-8">
              <div className="w-2/3">
                {images.length > 0 ? (
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
                  </div>
                ) : (
                  <p>No images available for this apartment.</p>
                )}
              </div>
              <div className="bg-green-400 w-1/3">
                <div className="text-primary-foreground bg-primary h-full shadow-md p-4 font-medium">
                  <div className="flex flex-col gap-3">
                    <div className="text-3xl font-bold">
                      Contact Information
                    </div>
                    <div>{data.address}</div>
                    <div>+234123123123</div>
                    <div>info@apartmenta.com</div>
                    <div>www.apartment-a.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ApartmentById;
