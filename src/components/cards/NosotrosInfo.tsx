import { FaGamepad, FaHeadphones, FaDesktop } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const features = [
  { icon: FaGamepad, title: "Gaming", desc: "Equipos para rendimiento extremo." },
  { icon: FaHeadphones, title: "Audio", desc: "Auriculares con sonido inmersivo." },
  { icon: FaDesktop, title: "Tecnologia", desc: "Innovacion en cada producto." },
];

const NosotrosInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className="max-w-lg mx-auto p-8 rounded-3xl
                 bg-white dark:bg-surface-800/80
                 border border-surface-200 dark:border-surface-700/50
                 shadow-card"
      data-aos="fade-left"
    >
      <h2 className="text-3xl font-bold text-gradient text-center mb-5">
        Quienes somos?
      </h2>

      <p className="text-surface-600 dark:text-surface-300 text-sm leading-relaxed mb-8 text-center">
        En <span className="text-gradient font-bold">Tecnologia R</span>, ofrecemos productos y perifericos
        para llevar tu experiencia de gaming y tecnologia al siguiente nivel. Equipos confiables, potentes y
        estilizados para entusiastas como tu.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500
                            flex items-center justify-center mb-3
                            group-hover:scale-110 transition-transform duration-300">
              <f.icon className="text-white text-lg" />
            </div>
            <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100">{f.title}</h3>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600
                           text-white text-sm font-bold shadow-lg hover:shadow-xl
                           transition-all duration-300 hover:-translate-y-0.5">
          Conoce mas
        </button>
      </div>
    </div>
  );
};

export default NosotrosInfo;
