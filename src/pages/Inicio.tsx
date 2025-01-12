import Banner from "../layout/inicio/Banner";
import MarcasSection from "../layout/inicio/MarcasSection";
import ProductoDesSection from "../layout/inicio/ProductsDesSection";
import ProductoSection from "../layout/inicio/ProductsSection";
import VideosSection from "../layout/inicio/VideosSection";

const Inicio = () => {
  const images = [
    "/images/inicio/dall-e2023-12-1012-26-36-createa1105x428pixelimageofadogeinagamingstore-thedogeshouldwearablackcapwith-r-store-onit-includeasignthatreadsexactlyon7835.png",
    "/images/inicio/dall-e2023-12-1012-28-00-createa1105x428pixelimagefeaturingadogeinagamingstore-thedogeshouldwearablackcapwith-r-store-onit-includeasignwiththeexact6395.png",
  ];
  return (
    <>
      <Banner slides={images} />
      <ProductoSection />
      <ProductoDesSection />
      <VideosSection />
      <MarcasSection animation="animate-infinite-scroll" scrollSpeed={1} />
    </>
  );
};

export default Inicio;
