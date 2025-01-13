const CollageImages = () => {
  return (
    <div className="relative w-full mx-auto max-w-md h-[700px]">
      {/* Primera imagen */}
      <img
        src="/images/nosotros/local_1.jpg"
        alt="Imagen 1"
        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-72 max-w-md rounded-lg shadow-2xl z-10"
      />

      {/* Segunda imagen */}
      <img
        src="/images/nosotros/local_2.jpg"
        alt="Imagen 2"
        className="absolute top-96 left-36 w-72 max-w-md rounded-lg shadow-2xl z-30"
      />

      {/* Tercera imagen */}
      <img
        src="/images/nosotros/local_3.jpg"
        alt="Imagen 3"
        className="absolute top-[250px] right-40 w-72 max-w-md rounded-lg shadow-2xl z-20"
      />
    </div>
  );
};

export default CollageImages;
