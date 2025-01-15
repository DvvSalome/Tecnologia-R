import React from "react";
import InicioProductButton from "../buttons/InicioProductButton";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: number;
  precio: number;
  descuento: number;
  imagenes: string[];
  popular: boolean;
}

const ProductoInicioCard: React.FC<{
  producto: Producto;
  onOpenModal: (producto: Producto) => void;
}> = ({ producto, onOpenModal }) => {
  return (
    <div
      className={`relative p-4 border border-gray-700 rounded-lg hover:z-30  hover:scale-105 transition-transform duration-300 ease-in-out ${
        producto.popular
          ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900"
          : "bg-gradient-to-br from-sky-900 via-sky-950 to-blue-900"
      } ${
        producto.popular ? "flex-row w-full" : "flex-col min-h-[350px]"
      } flex items-center h-full`}
    >
      {/* Etiqueta para productos populares */}
      {producto.popular && (
        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full absolute top-2 left-2 shadow-md">
          🔥 Lo más vendido
        </span>
      )}

      {/* Imagen del producto */}
      <img
        src={producto.imagenes[0]} // Muestra la primera imagen
        alt={`Imagen principal de ${producto.nombre}`}
        className={`object-cover rounded-md shadow-md ${
          producto.popular ? "w-40 h-40 mr-4" : "w-full h-48 mb-4"
        }`}
      />

      {/* Información del producto */}
      <div
        className={`text-center flex flex-col items-center ${
          producto.popular
            ? "items-start text-left"
            : "items-center text-center"
        } w-full`}
      >
        <h2 className="text-lg font-semibold text-gray-100 tracking-wide mb-2">
          {(() => {
            switch (producto.tipo) {
              case 1:
                return "Teclado";
              case 2:
                return "Mouse";
              case 3:
                return "Monitor";
              case 4:
                return "Audífono";
              case 5:
                return "Cámara";
              case 6:
                return "Micrófono";
              default:
                return "Otros";
            }
          })()}
        </h2>
        <p className="text-md text-gray-300 leading-tight">{producto.nombre}</p>
        <p className="text-md font-bold mt-2">
          {producto.descuento > 0 ? (
            <>
              <span className="text-green-400">
                ${producto.descuento.toFixed(2)}
              </span>
              <span className="line-through text-red-500 text-sm ml-2">
                ${producto.precio.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-green-400">
              ${producto.precio.toFixed(2)}
            </span>
          )}
        </p>

        {/* Botón */}
        <div className="mt-4">
          <InicioProductButton
            text="Ver más"
            onClick={() => onOpenModal(producto)} // Llama a la función de apertura del modal
          />
        </div>
      </div>
    </div>
  );
};

export default ProductoInicioCard;
