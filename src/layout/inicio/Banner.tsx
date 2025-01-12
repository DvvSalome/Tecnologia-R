import { useState, useEffect, useRef } from "react";

interface SliderProps {
  slides: string[];
}

const Banner = ({ slides }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const handleInteraction = (index: number) => {
    setCurrentIndex(index);
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);
  };

  return (
    <div className="flex justify-center my-10">
      <div className="relative w-10/12 overflow-hidden rounded-lg">
      {/* Contenedor de slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-[300px] md:h-[400px] lg:h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
      </div>

      {/* Botón anterior */}
      <button
        onClick={() => handleInteraction(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        ❮
      </button>

      {/* Botón siguiente */}
      <button
        onClick={() => handleInteraction(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        ❯
      </button>

      {/* Indicadores (puntos) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleInteraction(index)}
            className={`w-8 h-0.5 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Banner;