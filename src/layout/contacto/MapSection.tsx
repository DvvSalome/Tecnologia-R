import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FiMapPin, FiExternalLink } from "react-icons/fi";

const MapSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const googleMapsUrl = "https://www.google.com/maps/place/Tecnología+R/@6.254411,-75.5828875,17z";

  return (
    <div className="w-full px-3 sm:px-4 py-6 sm:py-10" data-aos="fade-up">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
          <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-800 dark:text-surface-100">
            Ubicanos
          </h2>
        </div>
        <p className="text-gradient font-bold text-base sm:text-lg">
          Tecnologia R
        </p>
        <p className="text-accent-500 font-semibold mt-1 text-sm sm:text-base">
          Medellin, Antioquia
        </p>
      </div>

      {/* Map */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-card border border-surface-200 dark:border-surface-700/50 max-w-5xl mx-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0707381677407!2d-75.5828875!3d6.254411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44297cdb660b9d%3A0x415d8009bb67eda!2sTecnolog%C3%ADa%20R!5e0!3m2!1ses-419!2sco!4v1753555329590!5m2!1ses-419!2sco"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[250px] sm:h-[350px] md:h-[400px]"
        />
      </div>

      <div className="flex justify-center mt-4 sm:mt-6">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl
                     bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold
                     shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5
                     active:scale-[0.98]"
        >
          <FiExternalLink className="w-4 h-4" />
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
};

export default MapSection;
