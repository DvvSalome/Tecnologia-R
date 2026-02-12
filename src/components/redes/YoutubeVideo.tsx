import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";

const YoutubeVideo = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div
      className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-card bg-white dark:bg-surface-800/80
                 border border-surface-200 dark:border-surface-700/50 mx-auto max-w-5xl"
      data-aos="fade-up"
    >
      <div className="flex flex-col md:flex-row">
        {/* Video */}
        <div className="w-full md:w-3/5">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/C2LwIyqWMRA?si=xIShyuhfiwWLyiRH&amp;start=28"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-lg sm:text-xl font-bold text-surface-800 dark:text-surface-100 mb-2 sm:mb-3">
            Nuestro canal
          </h3>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-4 sm:mb-6">
            Descubre reviews, unboxings y tutoriales de los mejores productos gaming y tecnologia en nuestro canal de YouTube.
          </p>
          <a
            href="https://www.youtube.com/@TecnologiaR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl
                       bg-red-500 hover:bg-red-600 text-white text-sm font-bold
                       shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
          >
            <FiExternalLink className="w-4 h-4" />
            Ver canal
          </a>
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideo;
