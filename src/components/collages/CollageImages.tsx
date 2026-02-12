import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const CollageImages = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="relative w-full mx-auto max-w-md h-[600px] lg:h-[700px]" data-aos="fade-right">
      {/* Image 1 */}
      <img
        src="/images/nosotros/local_1.jpg"
        alt="Tienda 1"
        className="absolute top-8 left-1/2 -translate-x-1/2 w-64 sm:w-72 rounded-2xl shadow-xl z-10
                   hover:scale-105 hover:z-40 transition-transform duration-500"
      />

      {/* Image 2 */}
      <img
        src="/images/nosotros/local_2.jpg"
        alt="Tienda 2"
        className="absolute top-72 left-8 sm:left-12 w-64 sm:w-72 rounded-2xl shadow-xl z-30
                   hover:scale-105 hover:z-40 transition-transform duration-500"
      />

      {/* Image 3 */}
      <img
        src="/images/nosotros/local_3.jpg"
        alt="Tienda 3"
        className="absolute top-48 right-4 sm:right-8 w-64 sm:w-72 rounded-2xl shadow-xl z-20
                   hover:scale-105 hover:z-40 transition-transform duration-500"
      />

      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-64 h-64 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20
                      blur-3xl -z-10" />
    </div>
  );
};

export default CollageImages;
