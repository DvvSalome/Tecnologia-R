import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FiTarget, FiCompass, FiEye } from "react-icons/fi";

const objetivos = [
  {
    icon: FiCompass,
    title: "Principio",
    desc: "Creemos en la innovacion constante y en el poder de la tecnologia para transformar la experiencia del gaming. Nuestro principio es ofrecer productos confiables y de alta calidad.",
  },
  {
    icon: FiTarget,
    title: "Mision",
    desc: "Proporcionar a los gamers y entusiastas de la tecnologia las herramientas necesarias para alcanzar su maximo potencial con equipos ergonomicos y rendimiento superior.",
  },
  {
    icon: FiEye,
    title: "Vision",
    desc: "Ser lideres en el mercado de perifericos gamer y tecnologia, reconocidos por nuestra calidad, compromiso y capacidad de innovar.",
  },
];

const ObjetivosCard = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="py-16 px-4 mb-10">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-gradient">
          Nuestros Objetivos
        </h2>
        <div className="mt-3 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {objetivos.map((obj, i) => (
          <div
            key={obj.title}
            className="group rounded-2xl p-7 bg-white dark:bg-surface-800/80
                       border border-surface-200 dark:border-surface-700/50
                       shadow-card card-hover text-center"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl
                            bg-gradient-to-br from-primary-500 to-accent-500
                            flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-300">
              <obj.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-surface-800 dark:text-surface-100 mb-3">
              {obj.title}
            </h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              {obj.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjetivosCard;
