import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { SITE } from "../../constants/site";

const datos = [
  {
    icon: FiMapPin,
    title: "Direccion",
    content: SITE.addressFull,
  },
  {
    icon: FiPhone,
    title: "Telefono",
    content: SITE.phoneDisplay,
  },
  {
    icon: FiMail,
    title: "Correo",
    content: SITE.email,
  },
];

const socialLinks = [
  { id: "youtube", href: SITE.social.youtube },
  { id: "instagram", href: SITE.social.instagram },
  { id: "facebook", href: SITE.social.facebook },
  { id: "twitter", href: SITE.social.twitter },
].filter((s) => Boolean(s.href));

const DatosEmpresaCard = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className="w-full lg:w-1/2 p-5 sm:p-8 rounded-3xl
                 bg-white dark:bg-surface-800/80
                 border border-surface-200 dark:border-surface-700/50
                 shadow-card"
      data-aos="fade-left"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100 text-center mb-6 sm:mb-8">
        Sobre Nosotros
      </h2>

      <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-6 sm:mb-8 text-center">
        Somos una empresa dedicada a brindar soluciones tecnologicas innovadoras. Nuestro objetivo es facilitar la vida a traves de productos y servicios de alta calidad.
      </p>

      <div className="space-y-4 sm:space-y-5">
        {datos.map((d) => (
          <div key={d.title} className="flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-primary-50 dark:bg-primary-950/30
                            flex items-center justify-center">
              <d.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100">{d.title}</h3>
              {d.title === "Correo" ? (
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5 break-words hover:text-primary-500"
                >
                  {d.content}
                </a>
              ) : (
                <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5 break-words">{d.content}</p>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-primary-50 dark:bg-primary-950/30
                          flex items-center justify-center">
            <FiClock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100">Horarios</h3>
            <ul className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5 space-y-0.5">
              <li><strong>Lunes a Viernes:</strong> 9:00 a.m. - 6:00 p.m.</li>
              <li><strong>Sabado:</strong> 9:00 a.m. - 4:00 p.m.</li>
              <li><strong>Domingo:</strong> Cerrado</li>
            </ul>
          </div>
        </div>
      </div>

      {socialLinks.length > 0 ? (
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-surface-200 dark:border-surface-700">
          <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100 mb-3">
            Siguenos
          </h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-100 dark:bg-surface-800
                           flex items-center justify-center
                           hover:bg-primary-500 hover:scale-110 active:scale-95 transition-all duration-300 group"
              >
                <img
                  src={`/images/footer/${social.id}.svg`}
                  alt={social.id}
                  className="w-4 sm:w-5 opacity-50 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert
                             transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DatosEmpresaCard;
