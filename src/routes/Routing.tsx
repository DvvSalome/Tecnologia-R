import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";

const Rounting: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos" element={<Inicio />} />
      <Route path="/contacto" element={<Inicio />} />
      <Route path="/nosotros" element={<Inicio />} />
    </Routes>
  );
};

export default Rounting;
