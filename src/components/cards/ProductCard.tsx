import { NavLink } from 'react-router-dom';

interface ProductsSectionProps {
  image: string;
  title: string;
  link: string;
}

const ProductsCard = ({ image, title, link }: ProductsSectionProps) => {
  return (
    <NavLink
      to={link}
      className="group relative flex items-center justify-center gap-2
                 w-12 sm:w-14 md:w-20 lg:w-auto
                 py-2 sm:py-2.5 md:py-3.5 lg:py-4 lg:px-7
                 rounded-xl sm:rounded-2xl overflow-hidden
                 bg-gradient-to-br from-primary-500 to-accent-500
                 shadow-lg hover:shadow-xl hover:shadow-primary-500/20
                 hover:scale-105 active:scale-95
                 transition-all duration-400"
    >
      {/* Animated shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                      bg-gradient-to-r from-transparent via-white/20 to-transparent
                      transition-transform duration-700 ease-out" />

      <img
        src={image}
        alt={title}
        className="relative w-5 sm:w-6 md:w-7 lg:w-8 brightness-0 invert
                   transition-transform duration-400 group-hover:scale-110 group-hover:rotate-[-5deg]"
      />
      <span className="relative font-bold text-sm md:text-base lg:text-lg text-white hidden md:block">
        {title}
      </span>
    </NavLink>
  );
};

export default ProductsCard;
