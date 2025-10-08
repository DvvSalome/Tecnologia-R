import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductoInicioCard from "../components/cards/ProductInicioCard";
import ProductInicioCardModal from "../components/cards/ProductInicioCardModal"; // Importa el modal
import productosDataRaw from "../../public/data/products.json"; // Importación del archivo JSON
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "react-lottie";
import animationData from "../../public/lotties/vacio.json";

const Productos: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const options = {
    loop: true, // Si quieres que la animación se repita
    autoplay: true, // Si la animación debe comenzar automáticamente
    animationData: animationData, // Aquí asignas la animación que descargaste
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Ajusta la proporción de la animación
    },
  };

  const { tipo } = useParams<{ tipo: string }>();

  // Verificar si "tipo" está definido
  if (!tipo) {
    return <div>Error: El parámetro 'tipo' no está definido.</div>;
  }

  const [productosFiltrados, setProductosFiltrados] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalProducto, setModalProducto] = useState<any | null>(null); // Estado para manejar el modal
  const itemsPerPage = 8;

  const getTipoNombre = (tipo: string) => {
    switch (tipo) {
      case "Teclados":
        return 1;
      case "Mouses":
        return 2;
      case "Monitores":
        return 3;
      case "Audífonos":
        return 4;
      case "Cámaras":
        return 5;
      case "Micrófonos":
        return 6;
      default:
        return 7; // Definir un tipo por defecto o un valor diferente
    }
  };

  useEffect(() => {
    // Filtrar productos por tipo y excluir los populares
    const productosPorTipo = productosDataRaw.filter(
      (producto: any) =>
        producto.tipo === getTipoNombre(tipo) && !producto.popular // Excluir los populares
    );
    setProductosFiltrados(productosPorTipo);
  }, [tipo]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productosFiltrados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

  const handleOpenModal = (producto: any) => {
    setModalProducto(producto); // Establecer el producto seleccionado en el modal
  };

  const handleCloseModal = () => {
    setModalProducto(null); // Cerrar el modal
  };

  if (productosFiltrados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div data-aos="fade-up">
          <Lottie options={options} height={400} width={400} />
        </div>
        <div className="bg-gray-300 dark:bg-sky-950 px-14 py-10 rounded-xl" data-aos="fade-down">
          <h1 className="text-2xl font-semibold text-black dark:text-white mb-4">
            ¡Lo sentimos!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Actualmente no hay productos disponibles para este tipo.
          </p>
          <button
            onClick={() => window.history.back()} // Regresar a la página anterior
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1
        className="text-3xl font-semibold mb-6 text-center shadow-md p-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg"
        data-aos="fade-down"
      >
        {tipo}
      </h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
        data-aos="flip-left"
      >
        {currentProducts.map((producto) => (
          <ProductoInicioCard
            key={producto.id}
            producto={producto}
            onOpenModal={handleOpenModal} // Pasar el manejador para abrir el modal
          />
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Mostrar el modal si modalProducto está definido */}
      {modalProducto && (
        <ProductInicioCardModal
          producto={modalProducto}
          onClose={handleCloseModal} // Pasar el manejador para cerrar el modal
        />
      )}
    </div>
  );
};

export default Productos;
