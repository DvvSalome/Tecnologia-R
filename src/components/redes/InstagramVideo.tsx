import { useEffect } from "react";

declare global {
  interface Window {
    instgrm: any;
  }
}

interface InstagramVideoProps {
  embedUrl: string;
}

const InstagramVideo = ({ embedUrl }: InstagramVideoProps) => {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [embedUrl]);

  return (
    <div className="w-full mx-auto rounded-2xl overflow-hidden shadow-card border border-surface-200 dark:border-surface-700/50">
      <blockquote
        className="instagram-media w-full p-0"
        data-instgrm-permalink={embedUrl}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          margin: "0",
          width: "100%",
        }}
      >
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 hover:text-primary-600 text-sm p-4 block"
        >
          Ver en Instagram
        </a>
      </blockquote>
    </div>
  );
};

export default InstagramVideo;
