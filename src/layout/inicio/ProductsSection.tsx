import ProductsCard from "../../components/cards/ProductCard"

const ProductoSection = () => {
  return (
    <div className="flex my-10 mx-10 justify-around">
      <ProductsCard image="/images/inicio/keyboard.svg" title="Teclados" link="" />
      <ProductsCard image="/images/inicio/mouse.svg" title="Mouses" link="" />
      <ProductsCard image="/images/inicio/monitor.svg" title="Monitores" link="" />
      <ProductsCard image="/images/inicio/headset.svg" title="Audífonos" link="" />
      <ProductsCard image="/images/inicio/cam.svg" title="Cámaras" link="" />
    </div>
  )
}

export default ProductoSection