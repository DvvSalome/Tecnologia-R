import { useEffect, useState } from "react";
import InstagramVideo from "../../components/redes/InstagramVideo";
import YoutubeVideo from "../../components/redes/YoutubeVideo";

const VideosSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  const videos = [
    "https://www.instagram.com/reel/C1Hz58HukaG/",
    "https://www.instagram.com/reel/C2LVievP6lS/?amp%3Butm_campaign=loading",
    "https://www.instagram.com/reel/C1xNOJSOg3x/?amp%3Butm_campaign=loading",
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambia el valor según el tamaño que desees
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar a la función al cargar para establecer el valor inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="my-10">
      <YoutubeVideo />
      <div className="mt-10 sm:mx-10">
        {isMobile ? (
          <div className="flex overflow-x-auto space-x-16">
            {/* Contenedor con scroll horizontal */}
            {videos.map((videoUrl, index) => (
              <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <InstagramVideo embedUrl={videoUrl} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-5">
            {/* Si no es móvil, muestra los videos en fila */}
            {videos.map((videoUrl, index) => (
              <InstagramVideo key={index} embedUrl={videoUrl} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosSection;
