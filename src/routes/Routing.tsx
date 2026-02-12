import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contacto from "../pages/Contacto";
import Nosotros from "../pages/Nosotros";
import Productos from "../pages/Productos";
import SearchResults from "../pages/SearchResults";
import ProductoDetalle from "../pages/ProductoDetalle";

const Rounting: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos/:tipo" element={<Productos />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Nosotros />} />
    </Routes>
  );
};

export default Rounting;
