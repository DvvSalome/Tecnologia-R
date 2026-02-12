import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const FormularioContacto = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const inputClasses = `w-full py-3 px-4 rounded-xl text-sm
    bg-surface-50 dark:bg-surface-800
    text-surface-800 dark:text-surface-100
    border border-surface-200 dark:border-surface-700
    focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 focus:outline-none
    placeholder:text-surface-400 dark:placeholder:text-surface-500
    transition-all duration-200`;

  return (
    <div
      className="w-full lg:w-1/2 p-5 sm:p-8 rounded-3xl
                 bg-white dark:bg-surface-800/80
                 border border-surface-200 dark:border-surface-700/50
                 shadow-card"
      data-aos="fade-right"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-surface-800 dark:text-surface-100 mb-6 sm:mb-8">
        Formulario de Contacto
      </h2>

      <form className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-surface-700 dark:text-surface-200 mb-1.5">
            Nombre completo
          </label>
          <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="correo" className="block text-sm font-semibold text-surface-700 dark:text-surface-200 mb-1.5">
            Correo electronico
          </label>
          <input type="email" id="correo" name="correo" placeholder="correo@ejemplo.com" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-semibold text-surface-700 dark:text-surface-200 mb-1.5">
            Telefono
          </label>
          <input type="tel" id="telefono" name="telefono" placeholder="+57 300 123 4567" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="motivo" className="block text-sm font-semibold text-surface-700 dark:text-surface-200 mb-1.5">
            Motivo de contacto
          </label>
          <select id="motivo" name="motivo" className={inputClasses} defaultValue="">
            <option value="" disabled>Seleccione un motivo</option>
            <option value="soporte">Soporte tecnico</option>
            <option value="informacion">Solicitar informacion</option>
            <option value="reclamos">Reclamos</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-semibold text-surface-700 dark:text-surface-200 mb-1.5">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            placeholder="Escriba su mensaje..."
            className={inputClasses + " resize-none"}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600
                       text-white text-sm font-bold shadow-lg hover:shadow-xl
                       transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Enviar mensaje
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioContacto;
