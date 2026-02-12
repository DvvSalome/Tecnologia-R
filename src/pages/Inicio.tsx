import { useEffect, useState } from "react";
import Banner from "../layout/inicio/Banner";
import ProductoDesSection from "../layout/inicio/ProductsDesSection";
import ProductoSection from "../layout/inicio/ProductsSection";
import VideosSection from "../layout/inicio/VideosSection";
import SearchBar from "../components/search/SearchBar";
import { FiArrowRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const TypewriterText = ({ words }: { words: string[] }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayed === word) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setCurrentWord((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayed(
        isDeleting ? word.substring(0, displayed.length - 1) : word.substring(0, displayed.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentWord, words]);

  return (
    <span className="text-gradient">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Inicio = () => {
  const images = [
    "/images/inicio/dall-e2023-12-1012-26-36-createa1105x428pixelimageofadogeinagamingstore-thedogeshouldwearablackcapwith-r-store-onit-includeasignthatreadsexactlyon7835.png",
    "/images/inicio/dall-e2023-12-1012-28-00-createa1105x428pixelimagefeaturingadogeinagamingstore-thedogeshouldwearablackcapwith-r-store-onit-includeasignwiththeexact6395.png",
  ];

  return (
    <>
      {/* Hero section */}
      <section className="relative py-8 sm:py-12 px-4 particles-bg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-900 dark:text-white leading-tight mb-4 animate-fade-in-up">
            Tu tienda de{" "}
            <TypewriterText words={["Teclados", "Mouses", "Audifonos", "Gaming", "Tecnologia"]} />
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm sm:text-base max-w-xl mx-auto mb-6 animate-fade-in-up animate-delay-200">
            Encuentra los mejores productos gaming y tecnologia al mejor precio. Envios a todo Colombia.
          </p>
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up animate-delay-400">
            <NavLink
              to="/productos/1"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                         bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-bold
                         shadow-lg hover:shadow-xl hover:shadow-primary-500/20
                         hover:-translate-y-0.5 transition-all duration-300"
            >
              Ver productos
              <FiArrowRight className="w-4 h-4" />
            </NavLink>
            <NavLink
              to="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                         bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200
                         text-sm font-bold border border-surface-200 dark:border-surface-700
                         hover:border-primary-300 dark:hover:border-primary-700
                         hover:-translate-y-0.5 transition-all duration-300"
            >
              Contactanos
            </NavLink>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-10 left-[10%] w-3 h-3 rounded-full bg-primary-400/30 animate-float hidden md:block" />
        <div className="absolute top-20 right-[15%] w-2 h-2 rounded-full bg-accent-400/30 animate-float-delayed hidden md:block" />
        <div className="absolute bottom-10 left-[20%] w-4 h-4 rounded-full bg-primary-300/20 animate-float-slow hidden md:block" />
      </section>

      <SearchBar />
      <Banner slides={images} />
      <ProductoSection />
      <ProductoDesSection />
      <VideosSection />
    </>
  );
};

export default Inicio;
