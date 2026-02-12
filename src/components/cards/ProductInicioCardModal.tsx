import React, { useState, useRef } from "react";
import { getProductImageUrl } from "../../utils/imageUrl";
import { FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: number;
  precio: number;
  descuento: number;
  imagenes: string[];
}

const ProductInicioCardModal: React.FC<{
  producto: Producto;
  onClose: () => void;
}> = ({ producto, onClose }) => {
  const fallbackImg = "/images/general/email.png";
  const firstImg = producto.imagenes?.[0]
    ? getProductImageUrl(producto.imagenes[0], fallbackImg)
    : fallbackImg;
  const [imagenPrincipal, setImagenPrincipal] = useState(firstImg);
  const imageRef = useRef<HTMLDivElement>(null);
  const [zoomStyle, setZoomStyle] = useState({
    backgroundPosition: "center",
    backgroundSize: "contain",
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imageRef.current) {
      const { width, height, left, top } = imageRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      setZoomStyle({
        backgroundPosition: `${(x / width) * 100}% ${(y / height) * 100}%`,
        backgroundSize: "200%",
      });
    }
  };

  const handleMouseLeave = () => {
    setZoomStyle({ backgroundPosition: "center", backgroundSize: "contain" });
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in"
    >
      <div className="bg-white dark:bg-surface-900 w-full sm:w-auto sm:max-w-4xl sm:mx-4
                      rounded-t-3xl sm:rounded-3xl shadow-2xl
                      max-h-[92vh] sm:max-h-[85vh] overflow-hidden relative animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl
                     bg-surface-100 dark:bg-surface-800 flex items-center justify-center
                     hover:bg-red-100 dark:hover:bg-red-950/30 hover:text-red-500
                     transition-all duration-300 shadow-sm"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Mobile drag indicator */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-surface-300 dark:bg-surface-700" />
        </div>

        <div className="flex flex-col md:flex-row max-h-[88vh] sm:max-h-[85vh] overflow-y-auto overscroll-contain">
          {/* Images section */}
          <div className="md:w-1/2 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
            {/* Main image with zoom (zoom only on non-touch) */}
            <div
              className="w-full aspect-square rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-800
                         bg-cover sm:cursor-zoom-in border border-surface-200 dark:border-surface-700"
              style={{
                backgroundImage: `url(${getProductImageUrl(imagenPrincipal, fallbackImg)})`,
                ...zoomStyle,
              }}
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={getProductImageUrl(imagenPrincipal, fallbackImg)}
                alt={`Imagen de ${producto.nombre}`}
                className="w-full h-full opacity-0"
              />
            </div>

            {/* Thumbnails */}
            {(producto.imagenes ?? []).length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {(producto.imagenes ?? []).map((imagen, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenPrincipal(imagen)}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-200
                      ${imagen === imagenPrincipal
                        ? "border-primary-500 ring-2 ring-primary-500/30"
                        : "border-surface-200 dark:border-surface-700 hover:border-primary-300"
                      }`}
                  >
                    <img
                      src={getProductImageUrl(imagen, fallbackImg)}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details section */}
          <div className="md:w-1/2 p-4 sm:p-6 md:pl-2 flex flex-col">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2 sm:mb-3 pr-8 sm:pr-10">
              {producto.nombre}
            </h2>

            <p className="text-surface-600 dark:text-surface-300 text-sm leading-relaxed mb-4 sm:mb-6 flex-1">
              {producto.descripcion}
            </p>

            {/* Price */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
              {producto.descuento > 0 ? (
                <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-accent-600 dark:text-accent-400">
                    ${producto.descuento.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-base sm:text-lg line-through text-surface-400 mb-0.5">
                    ${producto.precio.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">
                    -{Math.round((1 - producto.descuento / producto.precio) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-accent-600 dark:text-accent-400">
                  ${producto.precio.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/+571234567890?text=Hola, estoy interesado en el producto: ${producto.nombre}.%0AEnlace: ${window.location.origin}/producto/${producto.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full
                         bg-[#25D366] hover:bg-[#20bd5a] text-white
                         font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl shadow-lg
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5
                         active:scale-[0.98]"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span className="text-sm sm:text-base">Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInicioCardModal;
