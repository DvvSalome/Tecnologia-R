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
    <div className="w-full mx-auto">
      <blockquote
        className="instagram-media w-full p-0 rounded-lg shadow-md"
        data-instgrm-permalink={embedUrl}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          boxShadow: "0 0 1px rgba(0, 0, 0, 0.5), 0 1px 10px rgba(0, 0, 0, 0.15)",
          margin: "1px",
          width: "calc(100% - 2px)",
        }}
      >
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Ver esta publicación en Instagram
        </a>
      </blockquote>
    </div>
  );
};

export default InstagramVideo;
