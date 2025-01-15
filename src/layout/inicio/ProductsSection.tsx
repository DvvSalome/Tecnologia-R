import ProductsCard from "../../components/cards/ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ProductoSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <div className="flex my-10 md:mx-10 justify-evenly sm:justify-around" data-aos="flip-down">
      <ProductsCard
        image="/images/inicio/keyboard.svg"
        title="Teclados"
        link=""
      />
      <ProductsCard image="/images/inicio/mouse.svg" title="Mouses" link="" />
      <ProductsCard
        image="/images/inicio/monitor.svg"
        title="Monitores"
        link=""
      />
      <ProductsCard
        image="/images/inicio/headset.svg"
        title="Audífonos"
        link=""
      />
      <ProductsCard image="/images/inicio/cam.svg" title="Cámaras" link="" />
    </div>
  );
};

export default ProductoSection;
