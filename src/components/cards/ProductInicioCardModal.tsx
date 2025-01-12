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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto relative">
        {/* Cerrar modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ✖
        </button>

        <div className="flex gap-4 h-full max-h-[70vh] overflow-hidden">
          {/* Sección de imágenes */}
          <div className="flex-1 max-h-full overflow-y-auto">
            <div
              className="w-full h-auto rounded overflow-hidden bg-cover cursor-zoom-in"
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
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {producto.imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`Miniatura ${index + 1}`}
                  onClick={() => setImagenPrincipal(imagen)}
                  className={`w-16 h-16 rounded cursor-pointer ${
                    imagen === imagenPrincipal ? "border-2 border-blue-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sección de detalles */}
          <div className="flex-1 max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold">{producto.nombre}</h2>
            <p className="mt-2 text-gray-600">{producto.descripcion}</p>
            <p className="mt-4 text-lg font-bold text-green-600">
              Precio:{" "}
              {producto.descuento > 0 ? (
                <>
                  ${producto.descuento}
                  <span className="line-through text-red-500 ml-2">
                    ${producto.precio}
                  </span>
                </>
              ) : (
                <span>${producto.precio}</span>
              )}
            </p>

            {/* Botón de WhatsApp */}
            <a
              href={`https://wa.me/+571234567890?text=Hola, estoy interesado en el producto: ${producto.nombre}.%0AEnlace al producto: ${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
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
