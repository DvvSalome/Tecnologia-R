import Navbar from "./Navbar";
import "../App.css";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex justify-end">
      <header className="fixed top-0 left-0 w-full bg-gray-600 dark:bg-gray-700 bg-opacity-80 backdrop-blur-md nunito-sans-regular z-40">
        <div className="flex gap-5 px-5 sm:px-10 items-center ContainerPrimary">
          <img
            src="/images/header/Logo Tecnologia R.png"
            alt="logo"
            className="w-56 sm:w-72 drop-shadow-custom"
          />
          <button
            onClick={handleChangeTheme}
            className="text-white bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition relative"
          >
            <div className="flex items-center justify-center">
              {/* Sol (modo claro) */}
              <FaSun
                className={`text-yellow-400 w-6 h-6 transition-transform duration-500 ease-in-out ${
                  theme === "light"
                    ? "rotate-0 scale-100"
                    : "rotate-180 scale-0"
                }`}
              />
              {/* Luna (modo oscuro) */}
              <FaMoon
                className={`text-blue-400 w-6 h-6 absolute transition-transform duration-500 ease-in-out ${
                  theme === "dark" ? "rotate-0 scale-100" : "rotate-180 scale-0"
                }`}
              />
            </div>
          </button>
        </div>
      </header>
      <div className="z-50 mt-2.5 lg:mt-0 fixed items-center">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
