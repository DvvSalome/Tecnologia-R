import 'tailwindcss/tailwind.css';

const YoutubeVideo = () => {
  return (
    <div className="bg-gray-900 mx-10 text-white p-6 rounded-lg">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-2/3 lg:w-3/5 mr-0 md:mr-4 mb-4 md:mb-0">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/C2LwIyqWMRA?si=xIShyuhfiwWLyiRH&amp;start=28"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <div className="w-full md:w-1/3 lg:w-2/5 text-left">
          <h3 className="text-xl font-bold mb-2">Titulo de ejemplo</h3>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            laudantium quae cum nobis vel quaerat aut dolore esse! Deleniti
            repudiandae, nisi in laudantium similique error repellendus voluptatum
            doloribus aliquid enim.
          </p>
          <input
            type="button"
            value="Mira Nuestro Canal"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideo;
