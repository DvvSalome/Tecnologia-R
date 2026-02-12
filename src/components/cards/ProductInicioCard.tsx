import React, { useState } from "react";
import InicioProductButton from "../buttons/InicioProductButton";
import { getProductImageUrl } from "../../utils/imageUrl";
import { getTipoLabel } from "../../constants/productTypes";
import { FiShoppingBag } from "react-icons/fi";

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

  const discountPercent = producto.descuento > 0
    ? Math.round((1 - producto.descuento / producto.precio) * 100)
    : 0;

  return (
    <div
      onClick={() => onOpenModal(producto)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-400 card-hover
        bg-white dark:bg-surface-800/80 border border-surface-200/80 dark:border-surface-700/50
        ${producto.popular
          ? "flex-col sm:flex-row w-full shadow-lg ring-1 ring-accent-500/20"
          : "flex-col min-h-[340px] sm:min-h-[380px] shadow-card"
        } flex items-center h-full`}
    >
      {/* Popular badge */}
      {producto.popular && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-orange-500
                           text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg animate-pulse-slow">
            Lo mas vendido
          </span>
        </div>
      )}

      {/* Discount badge */}
      {discountPercent > 0 && !producto.popular && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center bg-red-500 text-white text-[11px] sm:text-xs font-bold
                           px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
            -{discountPercent}%
          </span>
        </div>
      )}

      {/* Image */}
      <div
        className={`relative overflow-hidden bg-surface-100 dark:bg-surface-800
          ${producto.popular
            ? "w-full h-48 sm:w-40 sm:h-40 sm:flex-shrink-0 sm:m-4 sm:rounded-xl"
            : "w-full h-44 sm:h-52"}`}
      >
        <img
          src={imgSrc}
          onError={() => setImgSrc(FALLBACK_IMG)}
          alt={`Imagen de ${producto.nombre}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-all duration-400" />

        {/* Quick view icon - hidden on touch */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-11 h-11 rounded-full bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm
                          flex items-center justify-center shadow-lg
                          scale-50 group-hover:scale-100 transition-transform duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
            <FiShoppingBag className="w-5 h-5 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div
        className={`p-3 sm:p-4 flex flex-col ${
          producto.popular
            ? "items-start text-left flex-1 w-full"
            : "items-center text-center w-full flex-1"
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary-500/80 dark:text-primary-400/80 mb-1 sm:mb-1.5">
          {getTipoLabel(producto.tipo)}
        </span>

        <h3 className="text-[13px] sm:text-sm font-bold text-surface-800 dark:text-surface-100 leading-snug mb-2 sm:mb-2.5 line-clamp-2
                       group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {producto.nombre}
        </h3>

        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {producto.descuento > 0 ? (
            <>
              <span className="text-base sm:text-lg font-extrabold text-accent-600 dark:text-accent-400">
                ${producto.descuento.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs sm:text-sm line-through text-surface-400 dark:text-surface-500">
                ${producto.precio.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </span>
            </>
          ) : (
            <span className="text-base sm:text-lg font-extrabold text-accent-600 dark:text-accent-400">
              ${producto.precio.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <InicioProductButton
            text="Ver mas"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(producto);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductoInicioCard;
