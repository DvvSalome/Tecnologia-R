import { useState, useEffect } from "react";
import ProductInicioCard from "../../components/cards/ProductInicioCard";
import { getLatestByType, groupForSlider } from "../../utils/products";
import ProductInicioCardModal from "../../components/cards/ProductInicioCardModal";
import AOS from "aos";
import "aos/dist/aos.css";
import { useProducts } from "../../contexts/ProductsContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductoDesSection = () => {
  const { products, loading, error } = useProducts();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const [modalProducto, setModalProducto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setItemsPerSlide(5);
      else if (window.innerWidth >= 992) setItemsPerSlide(4);
      else if (window.innerWidth >= 768) setItemsPerSlide(3);
      else setItemsPerSlide(2);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenModal = (producto: any) => setModalProducto(producto);
  const handleCloseModal = () => setModalProducto(null);

  const ultimosProductos = getLatestByType(products).filter((p) => !p.popular);
  const groupedProducts = groupForSlider(ultimosProductos, itemsPerSlide);

  const padGroup = (group: any[]) => {
    const diff = itemsPerSlide - group.length;
    return diff > 0 ? [...group, ...Array(diff).fill(null)] : group;
  };

  const productoPopular = products.find((producto) => producto.popular);

  if (loading) {
    return (
      <div className="my-8 sm:my-12 px-3 sm:px-4 lg:px-8 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="my-8 sm:my-12 px-3 sm:px-4 text-center text-red-500 dark:text-red-400 font-medium">
        Error: {error}
      </div>
    );
  }

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev < groupedProducts.length - 1 ? prev + 1 : 0));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : groupedProducts.length - 1));
  };

  return (
    <div className="my-8 sm:my-12 px-3 sm:px-4 lg:px-8 relative flex flex-col gap-4 sm:gap-6">
      {/* Top section: Featured product + banner */}
      <div className="flex gap-3 sm:gap-5">
        <div className="hidden lg:flex w-4/12" data-aos="fade-right">
          {productoPopular && (
            <ProductInicioCard producto={productoPopular} onOpenModal={handleOpenModal} />
          )}
        </div>
        <img
          src="/images/inicio/banner.png"
          alt="mini banner"
          className="w-full lg:w-8/12 rounded-xl sm:rounded-2xl shadow-card object-cover"
          data-aos="fade-left"
        />
      </div>

      {/* Section title */}
      <div className="flex items-center justify-between" data-aos="fade-up">
        <h2 className="text-lg sm:text-xl font-bold text-surface-800 dark:text-surface-100">
          Novedades
        </h2>
        {groupedProducts.length > 1 && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={goToPrevSlide}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center
                         hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-500
                         active:scale-90 transition-all duration-300"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] sm:text-xs font-medium text-surface-400 tabular-nums min-w-[2.5rem] text-center">
              {currentIndex + 1} / {groupedProducts.length}
            </span>
            <button
              onClick={goToNextSlide}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center
                         hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-500
                         active:scale-90 transition-all duration-300"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden" data-aos="fade-up">
        <div
          className="flex transition-transform duration-600 ease-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / groupedProducts.length}%)`,
            width: `${groupedProducts.length * 100}%`,
          }}
        >
          {groupedProducts.map((group, index) => (
            <div
              key={index}
              className="flex w-full"
              style={{ width: `${100 / groupedProducts.length}%` }}
            >
              {padGroup(group).map((producto, idx) =>
                producto ? (
                  <div
                    key={producto.id}
                    className="px-1.5 sm:px-2"
                    style={{ flex: `0 0 ${100 / itemsPerSlide}%` }}
                  >
                    <ProductInicioCard producto={producto} onOpenModal={handleOpenModal} />
                  </div>
                ) : (
                  <div
                    key={`placeholder-${idx}`}
                    className="px-1.5 sm:px-2"
                    style={{ flex: `0 0 ${100 / itemsPerSlide}%`, visibility: "hidden" }}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {groupedProducts.length > 1 && (
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {groupedProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300
                ${currentIndex === index
                  ? "w-5 sm:w-6 bg-primary-500"
                  : "w-2.5 sm:w-3 bg-surface-300 dark:bg-surface-700 hover:bg-surface-400"
                }`}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalProducto && (
        <ProductInicioCardModal producto={modalProducto} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProductoDesSection;
