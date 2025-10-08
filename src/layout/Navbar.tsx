import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "#" },
    { name: "Contacto", path: "/contacto" },
    { name: "Nosotros", path: "/nosotros" },
  ];

  const productSections = [
    {
      name: "Periféricos",
      id: "perifericos",
      options: [
        { name: "Teclados", id: 1 },
        { name: "Mouses", id: 2 },
        { name: "Monitores", id: 3 },
        { name: "Audifonos", id: 4 },
        { name: "Camaras", id: 5 },
        { name: "Microfonos", id: 5 },
      ],
    },
    {
      name: "Componentes",
      id: "componentes",
      options: [
        { name: "Placas base", id: 7 },
        { name: "Procesadores", id: 8 },
      ],
    },
  ];

  // tipo de productos(
// 1: teclados
// 2: mouse
// 3: monitores
// 4: audifonos
// 5: camaras
// 6: microfonos
// )

  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setOpenSubmenu(null);
  };

  const handleSubmenuToggle = (id: string) =>
    setOpenSubmenu((prev) => (prev === id ? null : id));

  const handleSectionClick = (id: number) => {
    closeSidebar();
    navigate(`/productos/${id}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isSidebarOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleProductClick = () => {
    closeSidebar();
    toggleSidebar();
  };

  return (
    <nav className="pt-2 pe-5 sm:p-4">
      <div className="flex flex-col items-end justify-between w-full">
        {/* Botón de hamburguesa */}
        <button
          ref={buttonRef}
          className="block lg:hidden focus:outline-none"
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

        {/* Menú principal */}
        <ul
          ref={menuRef}
          className={`lg:flex space-y-6 lg:space-y-0 lg:flex-row transition-all transform duration-500 ease-in-out ${
            isMenuOpen
              ? "flex flex-col items-center mt-11 w-full bg-gray-700 bg-opacity-90 px-6 py-4 opacity-100 lg:static lg:bg-transparent lg:opacity-100 lg:translate-y-0"
              : "hidden lg:flex lg:flex-row lg:items-center lg:space-x-4"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.path} className="text-xl font-semibold">
              {link.name === "Productos" ? (
                <button
                  onClick={handleProductClick}
                  className={`${
                    location.pathname.includes("/productos")
                      ? "bg-gradient-to-b from-green-400 to-blue-400 bg-clip-text text-transparent p-2 rounded font-bold"
                      : "dark:text-white text-black p-2 rounded hover:ring-2 hover:ring-blue-400"
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gradient-to-b from-green-400 to-blue-400 bg-clip-text text-transparent p-2 rounded font-bold"
                      : "dark:text-white text-black p-2 rounded hover:ring-2 hover:ring-blue-400"
                  }
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollToTop();
                  }}
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Menú lateral para Productos */}
      <div
        ref={sidebarRef}
        className={`fixed w-96 top-0 right-0 h-full bg-gray-600 dark:bg-gray-700 bg-opacity-60 backdrop-blur-sm text-white p-6 z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 bg-sky-950 p-3 mr-5 rounded-lg">Categorías de Productos</h2>
        {productSections.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => handleSubmenuToggle(section.id)}
              className="font-semibold hover:underline text-xl"
            >
              {section.name}
            </button>
            <ul
              className={`pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
                openSubmenu === section.id ? "max-h-44" : "max-h-0"
              }`}
            >
              {section.options.map((option) => (
                <li key={option.id} className="hover:underline text-lg">
                  <NavLink
                    to={`/productos/${option.name}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-bold"
                        : "text-white hover:text-blue-300"
                    }
                    onClick={closeSidebar}
                  >
                    P-{option.id}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-lg font-bold"
        >
          X
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
