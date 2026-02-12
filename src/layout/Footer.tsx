import SocialButton from "../components/buttons/SocialButton";
import { NavLink } from "react-router-dom";
import { FiMapPin, FiMail, FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Animated gradient top border */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-[length:200%_100%] animate-gradient-x" />

      <div className="bg-surface-100 dark:bg-surface-900 nunito-sans-regular relative">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="ContainerPrimary px-6 sm:px-10 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Logo & description */}
            <div className="lg:col-span-1 flex flex-col items-center md:items-start">
              <img
                src="/images/header/Logo Tecnologia R.png"
                alt="Tecnologia R"
                className="w-48 mb-5"
              />
              <p className="text-sm text-surface-500 dark:text-surface-400 text-center md:text-left leading-relaxed mb-5">
                Tu tienda de confianza en tecnologia y gaming. Productos de calidad para gamers y entusiastas en Medellin.
              </p>
              <div className="flex gap-3">
                <SocialButton icon="/images/footer/facebook.svg" link="" />
                <SocialButton icon="/images/footer/instagram.svg" link="" />
                <SocialButton icon="/images/footer/twitter.svg" link="" />
                <SocialButton icon="/images/footer/youtube.svg" link="" />
              </div>
            </div>

            {/* Products */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-bold uppercase tracking-wider text-surface-800 dark:text-surface-200 mb-5">
                Productos
              </h3>
              <div className="flex flex-col gap-3 items-center md:items-start">
                {[
                  { to: "/productos/1", label: "Teclados" },
                  { to: "/productos/2", label: "Mouses" },
                  { to: "/productos/3", label: "Monitores" },
                  { to: "/productos/4", label: "Audifonos" },
                  { to: "/productos/5", label: "Camaras" },
                  { to: "/productos/6", label: "Microfonos" },
                ].map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={scrollToTop}
                    className="group/link text-sm text-surface-500 dark:text-surface-400
                               hover:text-primary-500 dark:hover:text-primary-400
                               transition-colors duration-200 flex items-center gap-1"
                  >
                    {link.label}
                    <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-bold uppercase tracking-wider text-surface-800 dark:text-surface-200 mb-5">
                Empresa
              </h3>
              <div className="flex flex-col gap-3 items-center md:items-start">
                {[
                  { to: "/nosotros", label: "Nosotros" },
                  { to: "/contacto", label: "Contacto" },
                ].map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={scrollToTop}
                    className="group/link text-sm text-surface-500 dark:text-surface-400
                               hover:text-primary-500 dark:hover:text-primary-400
                               transition-colors duration-200 flex items-center gap-1"
                  >
                    {link.label}
                    <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-bold uppercase tracking-wider text-surface-800 dark:text-surface-200 mb-5">
                Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                    Medellin, Antioquia<br />Centro Comercial Carrusel
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    principal.tecnologiar@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-14 pt-8 border-t border-surface-200/60 dark:border-surface-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-surface-400 dark:text-surface-500">
              &copy; {new Date().getFullYear()} Tecnologia R &mdash; Todos los derechos reservados.
            </p>
            <button
              onClick={scrollToTop}
              className="text-xs text-surface-400 hover:text-primary-500 transition-colors duration-200 flex items-center gap-1"
            >
              Volver arriba
              <FiArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
