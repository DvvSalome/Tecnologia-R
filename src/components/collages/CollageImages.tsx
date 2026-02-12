import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const CollageImages = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="relative w-full mx-auto max-w-sm sm:max-w-md h-[420px] sm:h-[520px] lg:h-[700px]" data-aos="fade-right">
      {/* Image 1 */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 z-10 group/img1">
        <img
          src="/images/nosotros/local_1.jpg"
          alt="Tienda 1"
          className="w-48 sm:w-60 lg:w-72 rounded-2xl shadow-xl
                     transition-all duration-700 ease-out
                     group-hover/img1:shadow-2xl group-hover/img1:-translate-y-2 group-hover/img1:z-40"
        />
      </div>

      {/* Image 2 */}
      <div className="absolute top-48 sm:top-60 lg:top-72 left-2 sm:left-8 lg:left-12 z-30 group/img2">
        <img
          src="/images/nosotros/local_2.jpg"
          alt="Tienda 2"
          className="w-48 sm:w-60 lg:w-72 rounded-2xl shadow-xl
                     transition-all duration-700 ease-out
                     group-hover/img2:shadow-2xl group-hover/img2:-translate-y-2 group-hover/img2:z-40"
        />
      </div>

      {/* Image 3 */}
      <div className="absolute top-32 sm:top-40 lg:top-48 right-0 sm:right-4 lg:right-8 z-20 group/img3">
        <img
          src="/images/nosotros/local_3.jpg"
          alt="Tienda 3"
          className="w-48 sm:w-60 lg:w-72 rounded-2xl shadow-xl
                     transition-all duration-700 ease-out
                     group-hover/img3:shadow-2xl group-hover/img3:-translate-y-2 group-hover/img3:z-40"
        />
      </div>

      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20
                      blur-3xl -z-10" />
    </div>
  );
};

export default CollageImages;
