import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PRODUCT_TYPES } from "../constants/productTypes";
import { FiX, FiChevronDown, FiChevronRight, FiMonitor, FiCpu, FiHeadphones, FiCamera, FiMic, FiGrid } from "react-icons/fi";
import { BsKeyboard, BsMouse2 } from "react-icons/bs";

// Map category IDs to icons
const categoryIcons: Record<number, React.ReactNode> = {
  1: <BsKeyboard className="w-4 h-4" />,
  2: <BsMouse2 className="w-4 h-4" />,
  3: <FiMonitor className="w-4 h-4" />,
  4: <FiHeadphones className="w-4 h-4" />,
  5: <FiCamera className="w-4 h-4" />,
  6: <FiMic className="w-4 h-4" />,
  7: <FiCpu className="w-4 h-4" />,
  8: <FiCpu className="w-4 h-4" />,
  9: <FiGrid className="w-4 h-4" />,
};

/** Sidebar + overlay rendered via portal so it escapes any parent overflow/z-index constraints */
const SidebarPortal = ({
  isSidebarOpen,
  closeSidebar,
  productSections,
  openSubmenu,
  handleSubmenuToggle,
  handleSectionClick,
  sidebarRef,
}: {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  productSections: { name: string; id: string; icon: React.ReactNode; options: { name: string; id: number }[] }[];
  openSubmenu: string | null;
  handleSubmenuToggle: (id: string) => void;
  handleSectionClick: (id: number) => void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const navigate = useNavigate();

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-all duration-400
                    ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeSidebar}
      />

      {/* Sidebar - full width on very small, capped on larger */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full xs:w-80 sm:w-[380px] z-[9999]
                    bg-white dark:bg-surface-900
                    shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-surface-100 dark:border-surface-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-surface-900 dark:text-surface-100">Categorias</h2>
            <p className="text-[11px] sm:text-xs text-surface-400 mt-0.5">Explora nuestros productos</p>
          </div>
          <button
            onClick={closeSidebar}
            className="w-9 h-9 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center
                       hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500
                       transition-all duration-300 hover:rotate-90"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="p-3 sm:p-4 overflow-y-auto h-[calc(100%-80px)] sm:h-[calc(100%-90px)] overscroll-contain">
          {productSections.map((section, sIdx) => (
            <div
              key={section.id}
              className={`mb-2 sm:mb-3 ${isSidebarOpen ? "animate-slide-in-right" : ""}`}
              style={{ animationDelay: `${sIdx * 100 + 150}ms` }}
            >
              <button
                onClick={() => handleSubmenuToggle(section.id)}
                className="w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl
                           text-sm font-semibold text-surface-700 dark:text-surface-200
                           hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-all duration-300 group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary-500/10 to-accent-500/10
                                flex items-center justify-center text-primary-500
                                group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-all duration-300">
                  {section.icon}
                </div>
                <span className="flex-1 text-left text-sm">{section.name}</span>
                <span className="text-[10px] font-bold text-surface-400 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded-full">
                  {section.options.length}
                </span>
                <FiChevronDown
                  className={`w-4 h-4 text-surface-400 transition-transform duration-400 ${
                    openSubmenu === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-400 ease-out ${
                  openSubmenu === section.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-2 sm:pl-3 pr-1 sm:pr-2 py-1.5 sm:py-2 space-y-0.5">
                  {section.options.map((option, oIdx) => (
                    <button
                      key={`${section.id}-${option.id}`}
                      type="button"
                      onClick={() => handleSectionClick(option.id)}
                      className={`w-full flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl text-sm
                                 text-surface-600 dark:text-surface-400
                                 hover:text-primary-600 dark:hover:text-primary-400
                                 hover:bg-primary-50 dark:hover:bg-primary-950/20
                                 transition-all duration-200 group/item
                                 ${openSubmenu === section.id ? "animate-fade-in-up" : ""}`}
                      style={{ animationDelay: `${oIdx * 50}ms` }}
                    >
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-surface-100 dark:bg-surface-800
                                       flex items-center justify-center text-surface-400
                                       group-hover/item:text-primary-500 group-hover/item:bg-primary-50
                                       dark:group-hover/item:bg-primary-950/30
                                       transition-all duration-200">
                        {categoryIcons[option.id] || <FiGrid className="w-3.5 h-3.5" />}
                      </span>
                      <span className="flex-1 text-left text-[13px] sm:text-sm">{option.name}</span>
                      <FiChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Quick link to all products */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-surface-100 dark:border-surface-800">
            <button
              onClick={() => { closeSidebar(); navigate("/productos/1"); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-2xl
                         bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-bold
                         hover:shadow-lg hover:shadow-primary-500/20 hover:-translate-y-0.5
                         active:scale-[0.98] transition-all duration-300"
            >
              Ver todos los productos
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

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
      name: "Perifericos",
      id: "perifericos",
      icon: <BsKeyboard className="w-4 h-4" />,
      options: PRODUCT_TYPES.filter((t) => t.id >= 1 && t.id <= 6).map((t) => ({
        name: t.labelPlural,
        id: t.id,
      })),
    },
    {
      name: "Componentes",
      id: "componentes",
      icon: <FiCpu className="w-4 h-4" />,
      options: PRODUCT_TYPES.filter((t) => t.id >= 7 && t.id <= 8).map((t) => ({
        name: t.labelPlural,
        id: t.id,
      })),
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
    setIsMenuOpen(false);
    navigate(`/productos/${id}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
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

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isSidebarOpen]);

  // Auto-open first submenu when sidebar opens
  useEffect(() => {
    if (isSidebarOpen && !openSubmenu) {
      setOpenSubmenu("perifericos");
    }
  }, [isSidebarOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <nav className="flex items-center">
        {/* Hamburger button */}
        <button
          ref={buttonRef}
          className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-100/80 dark:bg-surface-800/80 flex items-center justify-center
                     hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-300 focus-ring"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <div className="w-4.5 sm:w-5 h-3.5 sm:h-4 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 rounded-full bg-surface-700 dark:bg-surface-200 transform transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
                isMenuOpen ? "rotate-45 translate-y-[6px] sm:translate-y-[7px] w-full" : "w-full"
              }`}
            />
            <span
              className={`block h-0.5 rounded-full bg-surface-700 dark:bg-surface-200 transition-all duration-300 ${
                isMenuOpen ? "opacity-0 w-0" : "w-3/4"
              }`}
            />
            <span
              className={`block h-0.5 rounded-full bg-surface-700 dark:bg-surface-200 transform transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
                isMenuOpen ? "-rotate-45 -translate-y-[6px] sm:-translate-y-[7px] w-full" : "w-1/2"
              }`}
            />
          </div>
        </button>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-0.5 bg-surface-100/60 dark:bg-surface-800/40 rounded-2xl p-1">
          {navLinks.map((link) => {
            const isProductsActive = location.pathname.includes("/productos");
            const isActive = link.name === "Productos"
              ? isProductsActive
              : link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <li key={link.name}>
                {link.name === "Productos" ? (
                  <button
                    onClick={toggleSidebar}
                    className={`nav-link-underline relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                      flex items-center gap-1.5
                      ${isActive
                        ? "text-primary-600 dark:text-primary-400 bg-white dark:bg-surface-800 shadow-sm"
                        : "text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-100 hover:bg-white/50 dark:hover:bg-surface-800/50"
                      }`}
                  >
                    {link.name}
                    <FiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-400 ${isSidebarOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    className={`nav-link-underline block px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                      ${isActive
                        ? "text-primary-600 dark:text-primary-400 bg-white dark:bg-surface-800 shadow-sm"
                        : "text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-100 hover:bg-white/50 dark:hover:bg-surface-800/50"
                      }`}
                    onClick={scrollToTop}
                  >
                    {link.name}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile menu dropdown */}
        <ul
          ref={menuRef}
          className={`lg:hidden absolute top-full right-0 mt-2 mr-3 sm:mr-4 w-52 sm:w-60 glass-strong rounded-2xl shadow-lg
                      overflow-hidden transition-all duration-400 origin-top-right
                      ${isMenuOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-2 pointer-events-none"}`}
        >
          {navLinks.map((link, i) => (
            <li
              key={link.name}
              className={`${isMenuOpen ? "animate-fade-in-up" : ""}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.name === "Productos" ? (
                <button
                  onClick={toggleSidebar}
                  className={`w-full text-left px-4 sm:px-5 py-3 sm:py-3.5 text-sm font-semibold transition-all duration-200
                    ${location.pathname.includes("/productos")
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30"
                      : "text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800/50"
                    } flex items-center justify-between`}
                >
                  {link.name}
                  <FiChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 sm:px-5 py-3 sm:py-3.5 text-sm font-semibold transition-all duration-200
                    ${isActive
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30"
                      : "text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800/50"
                    }`
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
      </nav>

      {/* Sidebar rendered via portal to escape header overflow constraints */}
      <SidebarPortal
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        productSections={productSections}
        openSubmenu={openSubmenu}
        handleSubmenuToggle={handleSubmenuToggle}
        handleSectionClick={handleSectionClick}
        sidebarRef={sidebarRef}
      />
    </>
  );
};

export default Navbar;
