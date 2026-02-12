import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductInicioCardModal from "../cards/ProductInicioCardModal";
import Lottie from "react-lottie";
import animationData from "../../../public/lotties/vacio.json";
import { useProducts } from "../../contexts/ProductsContext";
import { searchProducts } from "../../utils/products";
import { getProductImageUrl } from "../../utils/imageUrl";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [modalProducto, setModalProducto] = useState<any | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { products } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const handler = setTimeout(() => {
      const filtered = searchProducts(products, query).slice(0, 6);
      setResults(filtered);
    }, 300);
    return () => clearTimeout(handler);
  }, [query, products]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="w-full flex justify-center mt-6 sm:mt-8 mb-3 sm:mb-4 px-3 sm:px-4" ref={containerRef}>
      <div className="relative w-full max-w-2xl">
        {/* Search input */}
        <div
          className={`relative flex items-center rounded-2xl transition-all duration-300
            ${isFocused
              ? "shadow-lg ring-2 ring-primary-500/30 bg-white dark:bg-surface-800"
              : "shadow-card bg-white dark:bg-surface-800/80"
            }`}
        >
          <FiSearch className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-surface-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { setOpenDropdown(true); setIsFocused(true); }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setOpenDropdown(false);
                navigate(`/search?q=${encodeURIComponent(query.trim())}`);
              }
            }}
            placeholder="Busca productos..."
            className="w-full py-3 sm:py-3.5 pl-10 sm:pl-12 pr-3 sm:pr-4 rounded-2xl bg-transparent
                       text-surface-800 dark:text-surface-100
                       placeholder:text-surface-400 dark:placeholder:text-surface-500
                       focus:outline-none text-sm"
          />
        </div>

        {/* Dropdown */}
        {openDropdown && (
          <div className="absolute left-0 right-0 mt-2 glass-strong rounded-2xl shadow-lg overflow-hidden z-50 animate-slide-down
                          max-h-[60vh] sm:max-h-[70vh] overflow-y-auto overscroll-contain">
            {results.length > 0 ? (
              <ul className="py-1.5 sm:py-2">
                {results.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => setModalProducto(p)}
                    className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer
                               hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-colors duration-200
                               active:bg-primary-100 dark:active:bg-primary-950/30"
                  >
                    <img
                      src={getProductImageUrl(p.imagenes?.[0], "/images/general/email.png")}
                      alt={p.nombre}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg sm:rounded-xl border border-surface-200 dark:border-surface-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs sm:text-sm text-surface-800 dark:text-surface-100 truncate">
                        {p.nombre}
                      </div>
                      <div className="text-[11px] sm:text-xs text-accent-600 dark:text-accent-400 font-medium">
                        ${p.precio?.toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : query.trim() !== "" ? (
              <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-4">
                <div className="w-20 h-20 sm:w-28 sm:h-28">
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: animationData,
                      rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
                    }}
                    height={"100%"}
                    width={"100%"}
                  />
                </div>
                <p className="text-center text-xs sm:text-sm text-surface-500 mt-2">
                  No encontramos resultados para &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : (
              <div className="py-5 sm:py-6 text-center text-xs sm:text-sm text-surface-400">
                Escribe para buscar productos
              </div>
            )}
          </div>
        )}

        {modalProducto && (
          <ProductInicioCardModal producto={modalProducto} onClose={() => setModalProducto(null)} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
