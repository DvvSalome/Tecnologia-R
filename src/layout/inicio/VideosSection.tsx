import InstagramVideo from "../../components/redes/InstagramVideo";
import YoutubeVideo from "../../components/redes/YoutubeVideo";

const VideosSection = () => {
  return (
    <div className="my-10">
      <YoutubeVideo />
      <div className="flex mt-10 mx-10">
      <InstagramVideo embedUrl="https://www.instagram.com/reel/C1Hz58HukaG/" />
      <InstagramVideo embedUrl="https://www.instagram.com/reel/C2LVievP6lS/?amp%3Butm_campaign=loading" />
      <InstagramVideo embedUrl="https://www.instagram.com/reel/C1xNOJSOg3x/?amp%3Butm_campaign=loading" />
      </div>
    </div>
  )
}
export default VideosSection;