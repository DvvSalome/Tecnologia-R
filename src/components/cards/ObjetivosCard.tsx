const ObjetivosCard = () => {
  return (
    <div className="bg-slate-950 text-white py-10 px-4 mb-10">
      <h2 className="text-3xl font-bold text-sky-400 text-center mb-8">
        Nuestros Objetivos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Principio */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-sky-500 mb-4">Principio</h3>
          <p className="text-gray-300">
            En <span className="bg-gradient-to-b from-green-400 to-sky-400 text-transparent bg-clip-text font-bold">Tecnologia R</span>, 
            creemos en la innovación constante y en el poder de la tecnología 
            para transformar la experiencia del gaming. Nuestro principio es ofrecer 
            productos confiables y de alta calidad que estén siempre a la vanguardia.
          </p>
        </div>

        {/* Misión */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-sky-500 mb-4">Misión</h3>
          <p className="text-gray-300">
            Proporcionar a los gamers y entusiastas de la tecnología las herramientas 
            necesarias para alcanzar su máximo potencial. Nos enfocamos en ofrecer 
            equipos con diseños ergonómicos, rendimiento superior y precios accesibles.
          </p>
        </div>

        {/* Visión */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-sky-500 mb-4">Visión</h3>
          <p className="text-gray-300">
            Ser líderes en el mercado de periféricos gamer y tecnología, 
            reconocidos por nuestra calidad, compromiso y capacidad de innovar, 
            creando una comunidad apasionada por el gaming y la tecnología.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ObjetivosCard;
