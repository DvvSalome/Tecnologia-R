import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const MapSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // URL para abrir el mapa directamente en la ubicación de Tecnología R
  const googleMapsUrl = "https://www.google.com/maps/place/Tecnología+R/@6.254411,-75.5828875,17z";

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3" data-aos="flip-up">
      <h2 className="text-4xl font-bold text-black dark:text-white">¡Ubicanos Aquí!</h2>
      <p className="lg:text-2xl text-xl font-bold text-sky-400">
        Tecnología R
      </p>
      <span className="lg:text-3xl text-2xl text-green-500 font-bold">
        Medellín, Antioquia
      </span>

      {/* Mapa embedido con el iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0707381677407!2d-75.5828875!3d6.254411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44297cdb660b9d%3A0x415d8009bb67eda!2sTecnolog%C3%ADa%20R!5e0!3m2!1ses-419!2sco!4v1753555329590!5m2!1ses-419!2sco"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-10 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-sm hover:bg-blue-600"
      >
        Abrir en Google Maps
      </a>
    </div>
  );
};

export default MapSection;
