import { useEffect, useState } from "react";
import InstagramVideo from "../../components/redes/InstagramVideo";
import YoutubeVideo from "../../components/redes/YoutubeVideo";
import AOS from "aos";
import "aos/dist/aos.css";

const VideosSection = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  const videos = [
    "https://www.instagram.com/reel/C1Hz58HukaG/",
    "https://www.instagram.com/reel/C2LVievP6lS/?amp%3Butm_campaign=loading",
    "https://www.instagram.com/reel/C1xNOJSOg3x/?amp%3Butm_campaign=loading",
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="my-12 px-4">
      {/* Section title */}
      <div className="mb-8 text-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100">
          Contenido
        </h2>
        <div className="mt-2 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
      </div>

      <YoutubeVideo />

      <div className="mt-10" data-aos="fade-up">
        {isMobile ? (
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4">
            {videos.map((videoUrl, index) => (
              <div key={index} className="flex-shrink-0 w-[85%] snap-center">
                <InstagramVideo embedUrl={videoUrl} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
