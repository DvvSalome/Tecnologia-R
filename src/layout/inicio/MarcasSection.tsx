import React, { useEffect, useRef } from "react";

const images = [
  "/images/marcas/1.png",
  "/images/marcas/2.png",
  "/images/marcas/3.png",
  "/images/marcas/4.png",
  "/images/marcas/5.png",
  "/images/marcas/7.png",
];

const MarcasSection: React.FC = () => {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // Velocidad del scroll

    const startScrolling = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0; // Reinicia el scroll al punto inicial
      }
      container.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(startScrolling);
    };

    // Duplica las imágenes para el efecto infinito
    container.innerHTML += container.innerHTML;

    // Inicia el scroll infinito
    const animationFrameId = requestAnimationFrame(startScrolling);

    return () => cancelAnimationFrame(animationFrameId); // Limpieza
  }, []);

  return (
    <div className="relative overflow-hidden py-8">
      <h2 className="text-center text-3xl text-white font-semibold mb-6">
        MARCAS
      </h2>
      <div className="relative w-full overflow-hidden">
        {/* Contenedor principal */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-8 relative"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: "auto", paddingRight: "2rem" }}
            >
              <img src={src} alt={`Marca ${index + 1}`} className="h-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Gradientes para el efecto de desvanecimiento */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-600 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-600 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MarcasSection;
