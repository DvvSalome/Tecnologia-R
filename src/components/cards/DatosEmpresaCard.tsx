import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const DatosEmpresaCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className="bg-gray-800 w-11/12 lg:w-1/2 text-white py-10 px-5 md:px-10 lg:px-20 rounded-lg"
      data-aos="flip-right"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Sobre Nosotros
      </h2>
      <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
        Somos una empresa dedicada a brindar soluciones tecnológicas
        innovadoras. Nuestro objetivo es facilitar la vida de nuestros clientes
        a través de productos y servicios de alta calidad.
      </p>
      <div className="space-y-6">
        {/* Dirección */}
        <div>
          <h3 className="text-lg font-semibold">Dirección:</h3>
          <p className="text-gray-400 text-sm md:text-base">
            Calle 123, Barrio Innovación, Ciudad Tech, País Moderno.
          </p>
        </div>

        {/* Teléfono */}
        <div>
          <h3 className="text-lg font-semibold">Teléfono:</h3>
          <p className="text-gray-400 text-sm md:text-base">+123 456 7890</p>
        </div>

        {/* Correo Electrónico */}
        <div>
          <h3 className="text-lg font-semibold">Correo Electrónico:</h3>
          <p className="text-gray-400 text-sm md:text-base">
            contacto@empresa.com
          </p>
        </div>

        {/* Horarios de Atención */}
        <div>
          <h3 className="text-lg font-semibold">Horarios de Atención:</h3>
          <p className="text-gray-400 text-sm md:text-base">
            Lunes a Viernes: 9:00 AM - 6:00 PM
            <br />
            Sábados: 10:00 AM - 2:00 PM
          </p>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">
          Síguenos en nuestras redes sociales:
        </h3>
        <div className="flex gap-4 mt-4">
          <a href="#" className="hover:text-blue-500">
            <img
              src="/images/footer/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
          <a href="#" className="hover:text-pink-500">
            <img
              src="/images/footer/instagram.svg"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
          <a href="#" className="hover:text-blue-300">
            <img
              src="/images/footer/twitter.svg"
              alt="Twitter"
              className="w-6 h-6"
            />
          </a>
          <a href="#" className="hover:text-red-500">
            <img
              src="/images/footer/youtube.svg"
              alt="YouTube"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DatosEmpresaCard;
