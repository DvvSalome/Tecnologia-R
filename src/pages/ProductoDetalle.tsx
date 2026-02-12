import React from "react";
import { useParams } from "react-router-dom";
import ProductInicioCardModal from "../components/cards/ProductInicioCardModal";
import { useProducts } from "../contexts/ProductsContext";
import { getById } from "../utils/products";

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading, error } = useProducts();
  const producto = id ? getById(products, id) : undefined;

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

  if (!producto) {
    return (
      <div className="flex items-center justify-center h-64 text-surface-500">
        Producto no encontrado
      </div>
    );
  }

  return (
    <div className="py-8">
      <ProductInicioCardModal producto={producto} onClose={() => window.history.back()} />
    </div>
  );
};

export default ProductoDetalle;
