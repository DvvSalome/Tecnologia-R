import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contacto from "../pages/Contacto";

const Rounting: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos" element={<Inicio />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Inicio />} />
    </Routes>
  );
};

export default Rounting;
