import React, { useState, useRef } from "react";

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
  const [imagenPrincipal, setImagenPrincipal] = useState(producto.imagenes[0]);
  const imageRef = useRef<HTMLDivElement>(null); // Referencia a la imagen contenedora
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: "center", backgroundSize: "contain" });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imageRef.current) {
      const { width, height, left, top } = imageRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Calcula la posición del cursor en relación con la imagen
      const xPos = (x / width) * 100;
      const yPos = (y / height) * 100;

      setZoomStyle({
        backgroundPosition: `${xPos}% ${yPos}%`,
        backgroundSize: "200%" // Tamaño del zoom
      });
    }
  };

  const handleMouseLeave = () => {
    setZoomStyle({ backgroundPosition: "center", backgroundSize: "contain" }); // Restaurar cuando el mouse sale de la imagen
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()} // Cierra el modal si se hace clic en el fondo
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
    >
      <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto relative">
        {/* Botón cerrar modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl"
        >
          ✖
        </button>

        <div className="flex gap-6 h-full max-h-[70vh] overflow-hidden">
          {/* Sección de imágenes */}
          <div className="flex-1 max-h-full overflow-y-auto">
            <div
              className="w-full h-auto rounded-lg overflow-hidden bg-cover cursor-zoom-in border border-gray-300"
              style={{ backgroundImage: `url(${imagenPrincipal})`, ...zoomStyle }}
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={imagenPrincipal}
                alt={`Imagen de ${producto.nombre}`}
                className="w-full h-auto opacity-0" // Oculta la imagen real, solo se usa el fondo con zoom
              />
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {producto.imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`Miniatura ${index + 1}`}
                  onClick={() => setImagenPrincipal(imagen)}
                  className={`w-16 h-16 rounded-lg cursor-pointer border ${
                    imagen === imagenPrincipal ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sección de detalles */}
          <div className="flex-1 max-h-full overflow-y-auto">
            <h2 className="text-3xl font-bold text-blue-700">{producto.nombre}</h2>
            <p className="mt-3 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{producto.descripcion}</p>
            <p className="mt-5 text-xl font-bold text-green-700">
              {producto.descuento > 0 ? (
                <>
                  ${producto.descuento.toFixed(2)}
                  <span className="line-through text-red-500 ml-2">
                    ${producto.precio.toFixed(2)}
                  </span>
                </>
              ) : (
                <span>${producto.precio.toFixed(2)}</span>
              )}
            </p>

            {/* Botón de WhatsApp */}
            <a
              href={`https://wa.me/+571234567890?text=Hola, estoy interesado en el producto: ${producto.nombre}.%0AEnlace al producto: ${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 shadow-md transition duration-300"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInicioCardModal;
