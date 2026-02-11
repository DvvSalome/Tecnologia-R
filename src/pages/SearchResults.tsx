import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import productosDataRaw from "../../public/data/products.json";
import ProductoInicioCard from "../components/cards/ProductInicioCard";
import ProductInicioCardModal from "../components/cards/ProductInicioCardModal";
import Lottie from "react-lottie";
import animationData from "../../public/lotties/vacio.json";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
  const query = useQuery();
  const q = query.get("q") || "";
  const [modalProducto, setModalProducto] = useState<any | null>(null);

  const results = useMemo(() => {
    const qq = q.toLowerCase().trim();
    if (!qq) return [];
    return (productosDataRaw as any[]).filter(
      (p) =>
        p.nombre?.toLowerCase().includes(qq) ||
        p.descripcion?.toLowerCase().includes(qq)
    );
  }, [q]);

  const handleOpenModal = (producto: any) => setModalProducto(producto);
  const handleCloseModal = () => setModalProducto(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Resultados para: "{q}"</h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((p) => (
            <ProductoInicioCard key={p.id} producto={p} onOpenModal={handleOpenModal} />
          ))}
        </div>
      ) : q.trim() !== "" ? (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-48 h-48">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
              }}
              height={192}
              width={192}
            />
          </div>
          <div className="text-center text-lg text-gray-600 mt-4">No encontramos resultados para "{q}"</div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Escribe algo para buscar productos</div>
      )}

      {modalProducto && (
        <ProductInicioCardModal producto={modalProducto} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SearchResults;
