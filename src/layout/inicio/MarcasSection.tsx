import React, { useRef, useEffect, useState } from 'react';

const images = [
  '/images/marcas/1.png',
  '/images/marcas/2.png',
  '/images/marcas/3.png',
  '/images/marcas/4.png',
  '/images/marcas/5.png',
  '/images/marcas/7.png',
];

type MarcasSectionProps = {
  animation?: string;
  scrollSpeed?: number;
};

const MarcasSection: React.FC<MarcasSectionProps> = ({
  animation = '',
  scrollSpeed = 0.5,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Actualizar el ancho del contenedor en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Iniciar el ancho al cargar

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Inicia el scroll infinito
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollWrapper = scrollWrapperRef.current;

    if (!scrollContainer || !scrollWrapper || containerWidth === 0) return;

    const totalWidth = scrollWrapper.scrollWidth;
    let lastScrollPosition = 0;

    // Animación para scroll infinito
    const animateScroll = () => {
      if (!scrollWrapper) return;

      const currentScrollPosition = lastScrollPosition + scrollSpeed;

      // Si se ha desplazado fuera del contenedor, reajustamos la posición
      if (currentScrollPosition >= totalWidth) {
        scrollWrapper.style.transition = 'none'; // Desactivar la transición temporalmente
        scrollWrapper.style.transform = `translateX(0)`;
        lastScrollPosition = 0; // Reiniciar la posición
        setTimeout(() => {
          scrollWrapper.style.transition = 'transform 0s linear';
        }, 50);
      } else {
        scrollWrapper.style.transform = `translateX(-${currentScrollPosition}px)`;
        lastScrollPosition = currentScrollPosition;
      }

      // Continuar la animación
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Comenzamos la animación de scroll
    let animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollSpeed, containerWidth]);

  return (
    <div>
      <h2 className="w-full text-center text-3xl text-white font-semibold">
        OFRECIENDO LO MEJOR
      </h2>
      <div
        ref={scrollContainerRef}
        className="w-full inline-flex flex-nowrap overflow-hidden"
      >
        <div
          ref={scrollWrapperRef}
          className="flex"
          style={{
            display: 'flex',
            flexDirection: 'row',
            transition: 'transform 0.2s linear', // Suavizar la animación
          }}
        >
          {/* Duplicar las imágenes para crear el efecto de scroll infinito */}
          {[...images, ...images].map((src, index) => (
            <div key={index} className="flex-shrink-0">
              <img src={src} alt={`Image ${index + 1}`} className="h-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarcasSection;
