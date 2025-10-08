import React from "react";
import { useParams } from "react-router-dom";
import productosDataRaw from "../../public/data/products.json";
import ProductInicioCardModal from "../components/cards/ProductInicioCardModal";

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const producto = (productosDataRaw as any[]).find((p) => String(p.id) === id);

  if (!producto) {
    return <div className="p-8">Producto no encontrado</div>;
  }

  return (
    <div className="p-8">
      <ProductInicioCardModal producto={producto} onClose={() => window.history.back()} />
    </div>
  );
};

export default ProductoDetalle;
