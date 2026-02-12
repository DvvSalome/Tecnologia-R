import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface SliderProps {
  slides: string[];
}

const Banner = ({ slides }: SliderProps) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => resetTimeout();
  }, [currentIndex]);

  const handleInteraction = (index: number) => {
    setCurrentIndex(index);
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 5000);
  };

  return (
    <div className="flex justify-center mt-3 sm:mt-4 mb-6 sm:mb-8 px-3 sm:px-4" data-aos="fade-up">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl group">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-[180px] sm:h-[280px] md:h-[380px] lg:h-[460px] xl:h-[500px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Nav buttons - always visible on mobile (smaller), hover on desktop */}
        <button
          onClick={() => handleInteraction(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}
          className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2
                     w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl
                     bg-white/30 sm:bg-white/20 backdrop-blur-md text-white
                     flex items-center justify-center
                     sm:opacity-0 sm:group-hover:opacity-100
                     hover:bg-white/40 active:scale-90 transition-all duration-300"
        >
          <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => handleInteraction(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)}
          className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2
                     w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl
                     bg-white/30 sm:bg-white/20 backdrop-blur-md text-white
                     flex items-center justify-center
                     sm:opacity-0 sm:group-hover:opacity-100
                     hover:bg-white/40 active:scale-90 transition-all duration-300"
        >
          <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleInteraction(index)}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300
                ${currentIndex === index
                  ? "w-6 sm:w-8 bg-white"
                  : "w-3 sm:w-4 bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
