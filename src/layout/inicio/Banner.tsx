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
    <div className="flex justify-center mt-4 mb-8 px-4" data-aos="fade-up">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl shadow-xl group">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide})` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Nav buttons */}
        <button
          onClick={() => handleInteraction(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}
          className="absolute top-1/2 left-3 -translate-y-1/2
                     w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     hover:bg-white/30 transition-all duration-300"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleInteraction(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)}
          className="absolute top-1/2 right-3 -translate-y-1/2
                     w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     hover:bg-white/30 transition-all duration-300"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleInteraction(index)}
              className={`h-1.5 rounded-full transition-all duration-300
                ${currentIndex === index
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
