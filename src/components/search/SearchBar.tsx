import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsDataRaw from "../../../public/data/products.json";
import ProductInicioCardModal from "../cards/ProductInicioCardModal";
import Lottie from "react-lottie";
import animationData from "../../../public/lotties/vacio.json";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [modalProducto, setModalProducto] = useState<any | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const handler = setTimeout(() => {
      const q = query.toLowerCase();
      const filtered = (productsDataRaw as any[])
        .filter(
          (p) =>
            p.nombre?.toLowerCase().includes(q) ||
            p.descripcion?.toLowerCase().includes(q)
        )
        .slice(0, 6);

      setResults(filtered);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

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
    <div className="w-full flex justify-center my-6" ref={containerRef}>
      <div className="relative w-10/12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpenDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Navegar a página de resultados con la query
              setOpenDropdown(false);
              navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            }
          }}
          placeholder="Busca productos, ej: Havit, mouse, teclado..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {openDropdown && (
          <div className="absolute left-0 right-0 bg-white shadow-md mt-2 rounded max-h-64 overflow-auto z-50">
            {results.length > 0 ? (
              <ul>
                {results.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => setModalProducto(p)}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={p.imagenes?.[0]}
                      alt={p.nombre}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{p.nombre}</div>
                      <div className="text-xs text-gray-500">${p.precio}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : query.trim() !== "" ? (
              <div className="flex flex-col items-center justify-center p-6">
                <div className="w-40 h-40">
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: animationData,
                      rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
                    }}
                    height={160}
                    width={160}
                  />
                </div>
                <div className="text-center text-sm text-gray-600 mt-2">No encontramos resultados para "{query}"</div>
              </div>
            ) : (
              <div className="p-3 text-center text-sm text-gray-500">Escribe para buscar productos</div>
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
