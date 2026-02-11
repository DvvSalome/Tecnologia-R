import React from "react";
import { useParams } from "react-router-dom";
import ProductInicioCardModal from "../components/cards/ProductInicioCardModal";
import { useProducts } from "../contexts/ProductsContext";
import { getById } from "../utils/products";

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading, error } = useProducts();
  const producto = id ? getById(products, id) : undefined;

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!producto) return <div className="p-8">Producto no encontrado</div>;

  return (
    <div className="p-8">
      <ProductInicioCardModal producto={producto} onClose={() => window.history.back()} />
    </div>
  );
};

export default ProductoDetalle;
