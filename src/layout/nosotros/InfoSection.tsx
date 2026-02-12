import NosotrosInfo from "../../components/cards/NosotrosInfo";
import CollageImages from "../../components/collages/CollageImages";

const InfoSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-8 py-10 px-4">
      <CollageImages />
      <NosotrosInfo />
    </div>
  );
};

export default InfoSection;
