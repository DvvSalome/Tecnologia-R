import ProductsCard from "../../components/cards/ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const categories = [
  { image: "/images/inicio/keyboard.svg", title: "Teclados", link: "/productos/teclados" },
  { image: "/images/inicio/mouse.svg", title: "Mouses", link: "/productos/mouses" },
  { image: "/images/inicio/monitor.svg", title: "Monitores", link: "/productos/monitores" },
  { image: "/images/inicio/headset.svg", title: "Audifonos", link: "/productos/audifonos" },
  { image: "/images/inicio/cam.svg", title: "Camaras", link: "/productos/camaras" },
];

const ProductoSection = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="my-8 px-4">
      {/* Section title */}
      <div className="text-center mb-6" data-aos="fade-up">
        <h2 className="text-xl font-bold text-surface-800 dark:text-surface-100">
          Categorias
        </h2>
        <div className="mt-2 mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${i * 100 + 200}ms`, animationFillMode: 'forwards' }}
          >
            <ProductsCard image={cat.image} title={cat.title} link={cat.link} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductoSection;
