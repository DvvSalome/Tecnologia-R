import { useState, useEffect } from "react";
import ProductInicioCard from "../../components/cards/ProductInicioCard";
import productosDataRaw from "../../../public/data/products.json";
import ProductInicioCardModal from "../../components/cards/ProductInicioCardModal";

// Aseguramos que 'popular' sea siempre un booleano
const productosData = productosDataRaw.map((producto) => ({
  ...producto,
  popular: producto.popular ?? false,
}));

const ProductoDesSection = () => {
  const [modalProducto, setModalProducto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerSlide(5);
      } else if (window.innerWidth >= 992) {
        setItemsPerSlide(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar a la función para establecer el valor inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenModal = (producto: any) => {
    setModalProducto(producto);
  };

  const handleCloseModal = () => {
    setModalProducto(null);
  };

  // Dividimos productos en grupos según itemsPerSlide
  const groupedProducts = [];
  for (let i = 0; i < productosData.length; i += itemsPerSlide) {
    groupedProducts.push(productosData.slice(i, i + itemsPerSlide));
  }

  // Función para rellenar el último grupo si es necesario
  const padGroup = (group: any[]) => {
    const difference = itemsPerSlide - group.length;
    return difference > 0
      ? [...group, ...Array(difference).fill(null)]
      : group;
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < groupedProducts.length - 1 ? prevIndex + 1 : 0
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : groupedProducts.length - 1
    );
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
  };

  return (
    <div className="my-10 mx-5 sm:mx-20 relative flex flex-col gap-5">
      <div className="flex gap-5">
        <div className="hidden lg:flex w-4/12">
          <ProductInicioCard
            producto={productosData[7]}
            onOpenModal={handleOpenModal}
          />
        </div>
        <img
          src="/images/inicio/banner.png"
          alt="mini banner"
          className="w-full lg:w-8/12 rounded-xl"
        />
      </div>
      <div className="relative overflow-hidden">
        {/* Contenedor de los slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / groupedProducts.length
            }%)`,
            width: `${groupedProducts.length * 100}%`,
          }}
        >
          {groupedProducts.map((group, index) => (
            <div
              key={index}
              className="flex w-full"
              style={{ width: `${100 / groupedProducts.length}%` }}
            >
              {/* Mostrar los productos por slide */}
              {padGroup(group.filter((producto) => producto?.tipo === 1)).map(
                (producto, idx) =>
                  producto ? (
                    <div
                      key={producto.id}
                      className="flex-grow"
                      style={{ flex: `0 0 ${100 / itemsPerSlide}%` }}
                    >
                      <ProductInicioCard
                        producto={producto}
                        onOpenModal={handleOpenModal}
                      />
                    </div>
                  ) : (
                    <div
                      key={`placeholder-${idx}`}
                      className="flex-grow"
                      style={{
                        flex: `0 0 ${100 / itemsPerSlide}%`,
                        visibility: "hidden",
                      }}
                    />
                  )
              )}
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
        >
          Prev
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
        >
          Next
        </button>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {groupedProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`mx-1 p-2 rounded-full ${
              currentIndex === index ? "bg-gray-800 text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal de producto */}
      {modalProducto && (
        <ProductInicioCardModal
          producto={modalProducto}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductoDesSection;
