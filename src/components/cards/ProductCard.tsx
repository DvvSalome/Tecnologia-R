import '../../css/card.css'


interface ProductsSectionProps {
  image: string;
  title: string;
}

const ProductsCard = ({ image, title }: ProductsSectionProps) => {
  return (
    <a className='flex producto-card-background py-10 px-5 rounded-lg shadow-xl'>
      <img src={image} alt="" />
      <p>{title}</p>
    </a>
  )
}
export default ProductsCard;