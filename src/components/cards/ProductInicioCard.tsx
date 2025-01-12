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
      className={`relative producto-card p-4 border border-gray-700 rounded-lg shadow-xl flex items-center h-full ${
        producto.popular ? "bg-gray-800" : "bg-sky-950 flex-col min-h-[300px] max-h-[500px]"
      }`}
    >
      {/* Etiqueta para productos populares */}
      {producto.popular && (
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute top-2 right-2">
          Lo más vendido
        </span>
      )}

      <img
        src={producto.imagenes[0]} // Muestra la primera imagen
        alt={`Imagen principal de ${producto.nombre}`}
        className={`object-cover rounded mb-4 ${producto.popular ? "w-1/2" : "w-full h-48"}`}
      />
      <div className={`flex flex-col items-center ${producto.popular ? "w-1/2" : ""}`}>
        <h2 className="text-lg font-semibold flex-shrink-0">
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
        <p className="text-sm text-gray-600 flex-shrink-0">{producto.nombre}</p>
        <p className="text-md font-bold text-green-600 mt-2">
          Precio: ${producto.descuento}
          <span className="line-through text-red-500 ml-2">
            ${producto.precio}
          </span>
        </p>
        <InicioProductButton
          text="Ver más"
          onClick={() => onOpenModal(producto)} // Llama a la función de apertura del modal
        />
      </div>
    </div>
  );
};

export default ProductoInicioCard;
