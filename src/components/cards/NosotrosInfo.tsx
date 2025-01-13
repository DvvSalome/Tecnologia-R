import { FaGamepad, FaHeadphones, FaDesktop } from "react-icons/fa";

const NosotrosInfo = () => {
  return (
    <div className="bg-slate-950 text-white max-w-lg mx-auto p-6 rounded-lg shadow-lg">
      {/* Título */}
      <h2 className="text-3xl font-extrabold text-sky-400 mb-6 text-center">
        ¿Quiénes somos?
      </h2>

      {/* Descripción */}
      <p className="text-gray-300 text-lg mb-6 leading-relaxed">
        En <span className="bg-gradient-to-b from-green-400 to-sky-400 text-transparent bg-clip-text font-bold">Tecnologia R</span>, ofrecemos productos y periféricos diseñados para 
        llevar tu experiencia de gaming y tecnología al siguiente nivel. 
        Nuestra misión es proporcionar equipos confiables, potentes y 
        estilizados para entusiastas como tú.
      </p>

      {/* Características */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {/* Ítem 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-sky-500 p-4 rounded-full mb-3">
            <FaGamepad className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-sky-400">Gaming</h3>
          <p className="text-gray-300 text-sm">
            Equipos diseñados para rendimiento extremo.
          </p>
        </div>
        {/* Ítem 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-sky-500 p-4 rounded-full mb-3">
            <FaHeadphones className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-sky-400">Audio</h3>
          <p className="text-gray-300 text-sm">
            Auriculares con calidad de sonido inmersiva.
          </p>
        </div>
        {/* Ítem 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-sky-500 p-4 rounded-full mb-3">
            <FaDesktop className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-sky-400">Tecnología</h3>
          <p className="text-gray-300 text-sm">
            Innovación y potencia en cada producto.
          </p>
        </div>
      </div>

      {/* Botón */}
      <div className="flex justify-center">
        <button className="bg-sky-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-sky-600 transition-colors">
          Conoce más
        </button>
      </div>
    </div>
  );
};

export default NosotrosInfo;
