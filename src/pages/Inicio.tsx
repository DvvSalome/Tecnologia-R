import Banner from "../layout/inicio/Banner";
import ProductoSection from "../layout/inicio/ProductsSection";

const Inicio = () => {
  const images = [
    "/images/banner/dall-e2023-12-1012-26-36-createa1105x428pixelimageofadogeinagamingstore-thedogeshouldwearablackcapwith-r-store-onit-includeasignthatreadsexactlyon7835.png",
    "/images/banner/dall-e2023-12-1012-28-00-createa1105x428pixelimagefeaturingadogeinagamingstore-thedogeshouldwearablackcapwith-r-store-onit-includeasignwiththeexact6395.png",
  ];
  return (
    <>
      <Banner slides={images} />
      <ProductoSection />
    </>
  );
};

export default Inicio;
