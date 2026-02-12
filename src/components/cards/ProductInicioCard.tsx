import React, { useState } from "react";
import InicioProductButton from "../buttons/InicioProductButton";
import { getProductImageUrl } from "../../utils/imageUrl";
import { getTipoLabel } from "../../constants/productTypes";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: number;
  precio: number;
  descuento: number;
  imagenes: string[];
  popular?: boolean;
}

const FALLBACK_IMG = "/images/general/email.png";

const ProductoInicioCard: React.FC<{
  producto: Producto;
  onOpenModal: (producto: Producto) => void;
}> = ({ producto, onOpenModal }) => {
  const initialImg = producto?.imagenes?.length
    ? getProductImageUrl(producto.imagenes[0], FALLBACK_IMG)
    : FALLBACK_IMG;
  const [imgSrc, setImgSrc] = useState(initialImg);

  if (!producto) return null;

  return (
    <div
      className={`relative p-4 border shadow-md dark:border-gray-700 rounded-lg hover:z-30  hover:scale-105 transition-transform duration-300 ease-in-out ${
        producto.popular
          ? "dark:bg-gradient-to-br border-gray-200 bg-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-900"
          : "dark:bg-gradient-to-br border-gray-300 bg-white dark:from-sky-900 dark:via-sky-950 dark:to-blue-900"
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

      {/* Imagen del producto (URL de Supabase Storage o ruta local) */}
      <img
        src={imgSrc}
        onError={() => setImgSrc(FALLBACK_IMG)}
        alt={`Imagen principal de ${producto.nombre}`}
        loading="lazy"
        className={`object-cover rounded-md ${
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
        <h2 className="text-lg font-semibold text-gray-400 dark:text-white tracking-wide mb-2">
          {getTipoLabel(producto.tipo)}
        </h2>
        <p className="text-md text-black text-xl dark:text-gray-300 leading-tight">{producto.nombre}</p>
        <p className="text-md font-bold text-xl">
          {producto.descuento > 0 ? (
            <>
              <span className="text-green-400">
                ${producto.descuento.toFixed(3)}
              </span>
              <span className="line-through text-red-500 text-base ml-2">
                ${producto.precio.toFixed(3)}
              </span>
            </>
          ) : (
            <span className="text-green-400">
              ${producto.precio.toFixed(3)}
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
