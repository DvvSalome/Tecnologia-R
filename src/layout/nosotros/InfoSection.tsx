import NosotrosInfo from "../../components/cards/NosotrosInfo";
import CollageImages from "../../components/collages/CollageImages";

const InfoSection = () => {
  return(
    <div className="flex flex-col lg:flex-row lg:justify-center items-center mb-10">
      <CollageImages />
      <NosotrosInfo />
    </div>
  )
}

export default InfoSection;