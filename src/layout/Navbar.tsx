import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos" },
    { name: "Contacto", path: "/contacto" },
    { name: "Nosotros", path: "/nosotros" },
  ];

  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="p-4">
      <div className="flex items-center justify-between w-full">
        {/* Botón de hamburguesa o "X" */}
        <button
          ref={buttonRef}
          className="text-white block lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <div className="w-6 h-6 relative">
            <span
              className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 top-2.5" : "top-0"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "top-2.5"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 top-2.5" : "top-5"
              }`}
            ></span>
          </div>
        </button>

        {/* Menú en pantallas grandes y menú hamburguesa en pantallas pequeñas */}
        <ul
          ref={menuRef}
          className={`lg:flex space-y-6 lg:space-y-0 lg:flex-row transition-all transform duration-500 ease-in-out ${
            isMenuOpen
              ? "flex flex-col items-center absolute top-20 left-0 w-full bg-gray-700 bg-opacity-90 px-6 py-4 opacity-100 translate-y-0 lg:static lg:bg-transparent lg:opacity-100 lg:translate-y-0"
              : "hidden lg:flex lg:flex-row lg:items-center lg:space-x-4"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.path} className="text-xl font-semibold">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-b from-green-400 to-blue-400 bg-clip-text text-transparent p-2 rounded font-bold"
                    : "text-white p-2 rounded hover:ring-2 hover:ring-blue-400"
                }
                onClick={() => setIsMenuOpen(false)} // Cierra el menú al seleccionar un enlace
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
