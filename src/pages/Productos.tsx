import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductoInicioCard from "../components/cards/ProductInicioCard";
import ProductInicioCardModal from "../components/cards/ProductInicioCardModal";
import { useProducts } from "../contexts/ProductsContext";
import { getByType } from "../utils/products";
import { getTipoIdFromSlug, PRODUCT_TYPES } from "../constants/productTypes";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "react-lottie";
import animationData from "../../public/lotties/vacio.json";
import { FiChevronLeft, FiChevronRight, FiArrowLeft } from "react-icons/fi";

const Productos: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  const { tipo } = useParams<{ tipo: string }>();

  if (!tipo) {
    return (
      <div className="flex items-center justify-center h-64 text-surface-500">
        Error: El parametro 'tipo' no esta definido.
      </div>
    );
  }

  const [productosFiltrados, setProductosFiltrados] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalProducto, setModalProducto] = useState<any | null>(null);
  const itemsPerPage = 8;

  const { products, loading, error } = useProducts();

  const tipoNumerico = Number(tipo);
  const tipoAUsar = !Number.isNaN(tipoNumerico) ? tipoNumerico : getTipoIdFromSlug(tipo);
  const tipoInfo = PRODUCT_TYPES.find((t) => t.id === tipoAUsar);
  const tipoNombre = tipoInfo?.labelPlural ?? tipo;

  useEffect(() => {
    const productosPorTipo = getByType(products, tipoAUsar, true);
    setProductosFiltrados(productosPorTipo);
    setCurrentPage(1);
  }, [tipo, products]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  if (productosFiltrados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] px-3 sm:px-4" data-aos="fade-up">
        <Lottie options={lottieOptions} height={220} width={220} />
        <div className="glass rounded-3xl px-6 sm:px-10 py-6 sm:py-8 text-center mt-4 max-w-md w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-surface-800 dark:text-surface-100 mb-2 sm:mb-3">
            Sin productos
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mb-5 sm:mb-6 text-sm">
            Actualmente no hay productos disponibles en esta categoria.
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3
                       bg-primary-500 hover:bg-primary-600 text-white
                       font-semibold rounded-xl shadow-lg
                       hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
          >
            <FiArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8" data-aos="fade-down">
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-800 dark:text-surface-100">
          {tipoNombre}
        </h1>
        <div className="mt-2 h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
        <p className="mt-2 text-xs sm:text-sm text-surface-500 dark:text-surface-400">
          {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? "s" : ""} disponible{productosFiltrados.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-10">
        {currentProducts.map((producto, index) => (
          <div
            key={producto.id}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
          >
            <ProductoInicioCard
              producto={producto}
              onOpenModal={(p) => setModalProducto(p)}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center
                       disabled:opacity-30 hover:bg-primary-50 dark:hover:bg-primary-950/30
                       hover:text-primary-500 transition-all duration-300"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300
                ${currentPage === i + 1
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                  : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-950/30"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center
                       disabled:opacity-30 hover:bg-primary-50 dark:hover:bg-primary-950/30
                       hover:text-primary-500 transition-all duration-300"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal */}
      {modalProducto && (
        <ProductInicioCardModal producto={modalProducto} onClose={() => setModalProducto(null)} />
      )}
    </div>
  );
};

export default Productos;
