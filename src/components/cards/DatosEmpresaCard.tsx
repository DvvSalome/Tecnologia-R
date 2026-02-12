import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const datos = [
  {
    icon: FiMapPin,
    title: "Direccion",
    content: "CENTRO COMERCIAL CARRUSEL DEL EXITO, Cl. 48D #65A-57 Local 220-221-222, Laureles - Estadio, Medellin",
  },
  {
    icon: FiPhone,
    title: "Telefono",
    content: "+123 456 7890",
  },
  {
    icon: FiMail,
    title: "Correo",
    content: "principal.tecnologiar@gmail.com",
  },
];

const DatosEmpresaCard = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className="w-11/12 lg:w-1/2 p-8 rounded-3xl
                 bg-white dark:bg-surface-800/80
                 border border-surface-200 dark:border-surface-700/50
                 shadow-card"
      data-aos="fade-left"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100 text-center mb-8">
        Sobre Nosotros
      </h2>

      <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-8 text-center">
        Somos una empresa dedicada a brindar soluciones tecnologicas innovadoras. Nuestro objetivo es facilitar la vida a traves de productos y servicios de alta calidad.
      </p>

      <div className="space-y-5">
        {datos.map((d) => (
          <div key={d.title} className="flex items-start gap-4">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-primary-50 dark:bg-primary-950/30
                            flex items-center justify-center">
              <d.icon className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100">{d.title}</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{d.content}</p>
            </div>
          </div>
        ))}

        {/* Horarios */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-primary-50 dark:bg-primary-950/30
                          flex items-center justify-center">
            <FiClock className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100">Horarios</h3>
            <ul className="text-sm text-surface-500 dark:text-surface-400 mt-0.5 space-y-0.5">
              <li><strong>Lunes a Viernes:</strong> 9:00 a.m. - 6:00 p.m.</li>
              <li><strong>Sabado:</strong> 9:00 a.m. - 4:00 p.m.</li>
              <li><strong>Domingo:</strong> Cerrado</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social icons */}
      <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
        <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100 mb-3">
          Siguenos
        </h3>
        <div className="flex gap-3">
          {["facebook", "instagram", "twitter", "youtube"].map((social) => (
            <a
              key={social}
              href="#"
              className="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800
                         flex items-center justify-center
                         hover:bg-primary-500 hover:scale-110 transition-all duration-300 group"
            >
              <img
                src={`/images/footer/${social}.svg`}
                alt={social}
                className="w-5 opacity-50 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert
                           transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatosEmpresaCard;
