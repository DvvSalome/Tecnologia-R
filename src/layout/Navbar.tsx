import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
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
      options: [{ name: "Teclados", id: 1 }, { name: "Mouse", id: 2 }],
    },
    {
      name: "Componentes",
      id: "componentes",
      options: [{ name: "Placas base", id: 3 }, { name: "Procesadores", id: 4 }],
    },
  ];

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

  const handleProductClick = () => toggleSidebar();

  return (
    <nav className="p-4">
      <div className="flex items-center justify-between w-full">
        {/* Botón de hamburguesa */}
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

        {/* Menú principal */}
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
              {link.name === "Productos" ? (
                <button
                  onClick={handleProductClick}
                  className="text-white p-2 rounded hover:ring-2 hover:ring-blue-400 focus:outline-none"
                >
                  {link.name}
                </button>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gradient-to-b from-green-400 to-blue-400 bg-clip-text text-transparent p-2 rounded font-bold"
                      : "text-white p-2 rounded hover:ring-2 hover:ring-blue-400"
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

      {/* Menú lateral */}
      <div
        ref={sidebarRef}
        className={`fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50 transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-64 bg-gray-800 p-6 shadow-lg">
          <button
            className="text-white mb-4 focus:outline-none"
            onClick={closeSidebar}
          >
            Cerrar
          </button>
          <ul>
            {productSections.map((section) => (
              <li key={section.id} className="mb-4">
                <button
                  className="text-white font-bold focus:outline-none"
                  onClick={() => handleSubmenuToggle(section.id)}
                >
                  {section.name}
                </button>
                {openSubmenu === section.id && (
                  <ul className="ml-4 mt-2">
                    {section.options.map((option) => (
                      <li key={option.id}>
                        <button
                          onClick={() => handleSectionClick(option.id)}
                          className="text-blue-400 hover:underline focus:outline-none"
                        >
                          {option.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
