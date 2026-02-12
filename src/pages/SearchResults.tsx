import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductoInicioCard from "../components/cards/ProductInicioCard";
import ProductInicioCardModal from "../components/cards/ProductInicioCardModal";
import Lottie from "react-lottie";
import animationData from "../../public/lotties/vacio.json";
import { useProducts } from "../contexts/ProductsContext";
import { searchProducts } from "../utils/products";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
  const query = useQuery();
  const q = query.get("q") || "";
  const [modalProducto, setModalProducto] = useState<any | null>(null);
  const { products, loading, error } = useProducts();

  const results = useMemo(() => searchProducts(products, q), [products, q]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-surface-800 dark:text-surface-100">
          Resultados para: <span className="text-gradient">&ldquo;{q}&rdquo;</span>
        </h1>
        <div className="mt-2 h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
        {results.length > 0 && (
          <p className="mt-2 text-xs sm:text-sm text-surface-500">
            {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {results.map((p) => (
            <ProductoInicioCard
              key={p.id}
              producto={p}
              onOpenModal={(producto) => setModalProducto(producto)}
            />
          ))}
        </div>
      ) : q.trim() !== "" ? (
        <div className="flex flex-col items-center justify-center py-10 sm:py-12">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData,
              rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
            }}
            height={180}
            width={180}
          />
          <p className="text-center text-surface-500 mt-4 text-sm px-4">
            No encontramos resultados para &ldquo;{q}&rdquo;
          </p>
        </div>
      ) : (
        <div className="text-center text-surface-400 py-12 text-sm">
          Escribe algo para buscar productos
        </div>
      )}

      {modalProducto && (
        <ProductInicioCardModal producto={modalProducto} onClose={() => setModalProducto(null)} />
      )}
    </div>
  );
};

export default SearchResults;
