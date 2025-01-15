import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const FormularioContacto = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="bg-gray-900 w-11/12 lg:w-1/2 text-white py-10 px-5 sm:px-10 md:px-20 rounded-lg" data-aos="flip-left">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Formulario de Contacto
      </h2>
      <form className="space-y-6">
        {/* Nombre completo */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingrese su nombre completo"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Correo */}
        <div>
          <label htmlFor="correo" className="block text-sm font-medium mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Ingrese su correo electrónico"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Número de teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium mb-2">
            Número de teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Ingrese su número de teléfono"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Motivo */}
        <div>
          <label htmlFor="motivo" className="block text-sm font-medium mb-2">
            Motivo de contacto
          </label>
          <select
            id="motivo"
            name="motivo"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled selected>
              Seleccione un motivo
            </option>
            <option value="soporte">Soporte técnico</option>
            <option value="informacion">Solicitar información</option>
            <option value="reclamos">Reclamos</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            placeholder="Escriba su mensaje"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Botón de envío */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioContacto;
