import Navbar from "./Navbar";
import "../App.css";
import { useEffect, useState, useCallback } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500
        ${scrolled
          ? "glass-strong shadow-glass"
          : "bg-white/60 dark:bg-surface-950/60 backdrop-blur-md border-b border-transparent"
        }`}
    >
      <div
        className={`ContainerPrimary flex items-center justify-between px-3 sm:px-6 lg:px-8 transition-all duration-500
          ${scrolled ? "py-1.5 sm:py-2" : "py-2.5 sm:py-3.5"}`}
      >
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0 group min-w-0">
          <img
            src="/images/header/Logo Tecnologia R.png"
            alt="Tecnologia R"
            className={`drop-shadow-custom transition-all duration-500 group-hover:scale-105
              ${scrolled ? "w-28 sm:w-36 lg:w-40" : "w-32 sm:w-44 lg:w-52"}`}
          />
        </NavLink>

        {/* Right side: Navbar + Theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Navbar />

          {/* Theme toggle */}
          <button
            onClick={handleChangeTheme}
            className={`relative rounded-full flex items-center transition-all duration-500 shadow-sm focus-ring flex-shrink-0
              ${theme === "dark"
                ? "bg-surface-800 w-14 h-8 sm:w-16 sm:h-9"
                : "bg-amber-100 w-14 h-8 sm:w-16 sm:h-9"
              }`}
            aria-label="Cambiar tema"
          >
            <FaSun className="absolute left-1.5 sm:left-2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 transition-opacity duration-300"
              style={{ opacity: theme === "light" ? 0.4 : 0.15 }} />
            <FaMoon className="absolute right-1.5 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-300 transition-opacity duration-300"
              style={{ opacity: theme === "dark" ? 0.4 : 0.15 }} />

            <div
              className={`absolute w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-md flex items-center justify-center
                transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
                ${theme === "dark"
                  ? "translate-x-[1.625rem] sm:translate-x-8 bg-surface-700"
                  : "translate-x-1 bg-white"
                }`}
            >
              <FaSun
                className={`absolute w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 transition-all duration-400
                  ${theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-180 opacity-0"}`}
              />
              <FaMoon
                className={`absolute w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-400 transition-all duration-400
                  ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0"}`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
