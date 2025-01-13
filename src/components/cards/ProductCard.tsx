import { NavLink } from 'react-router-dom';
import '../../css/card.css'


interface ProductsSectionProps {
  image: string;
  title: string;
  link: string;
}

const ProductsCard = ({ image, title, link }: ProductsSectionProps) => {
  return (
    <NavLink to={link} className='flex w-14 sm:w-16 md:w-1/12 lg:w-1/6 producto-card-background rounded-full py-2 sm:py-5 lg:py-12 lg:rounded-lg shadow-2xl justify-center gap-2 hover:scale-110 transition duration-300'>
      <img src={image} alt="icono" className='w-6 md:w-8' />
      <p className='font-semibold text-2xl hidden lg:flex'>{title}</p>
    </NavLink>
  )
}
export default ProductsCard;