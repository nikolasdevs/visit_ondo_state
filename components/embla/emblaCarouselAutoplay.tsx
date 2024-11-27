import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
//import { AutoplayType } from "embla-carousel-autoplay";

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  toggleAutoplay: () => void;
  onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  // const getAutoplayPlugin = useCallback((): AutoplayType | undefined => {
  //   if (!emblaApi) return undefined;
  //   const plugins = emblaApi.plugins() as Record<string, unknown>;
  //   return plugins.autoplay as AutoplayType | undefined;
  // }, [emblaApi]);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [emblaApi])


  //   if (autoplay.isPlaying()) {
  //     autoplay.stop();
  //   } else {
  //     autoplay.play();
  //   }
  // }, [getAutoplayPlugin]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

     setAutoplayIsPlaying(autoplay.isPlaying())
    emblaApi
      .on('autoplay:play', () => setAutoplayIsPlaying(true))
      .on('autoplay:stop', () => setAutoplayIsPlaying(false))
      .on('reInit', () => setAutoplayIsPlaying(autoplay.isPlaying()))
  }, [emblaApi])

  //   const updateAutoplayState = () =>
  //     setAutoplayIsPlaying(autoplay.isPlaying());

  //   setAutoplayIsPlaying(autoplay.isPlaying());
  //   emblaApi?.on("reInit", updateAutoplayState);

  //   return () => {
  //     emblaApi?.off("reInit", updateAutoplayState);
  //   };
  // }, [emblaApi, getAutoplayPlugin]);

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
  };
};
