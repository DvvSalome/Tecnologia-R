import SocialButton from "../components/buttons/SocialButton";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white nunito-sans-regular flex flex-col items-center gap-10 py-10">
      <div className="flex gap-10 px-10 items-center ContainerPrimary">
        <img src="/images/header/Logo Tecnologia R.png" alt="logo" />
        <div className="flex items-start justify-around w-full">
          <div className="flex flex-col gap-5">
            <p className="text-xl text-gray-400 font-bold">Productos</p>
            <div className="flex flex-col gap-3 text-gray-500">
              <NavLink to="/teclados" className="hover:text-blue-500">
                Teclados
              </NavLink>
            </div>
            <div className="flex flex-col gap-3 text-gray-500">
              <NavLink to="/mouses" className="hover:text-blue-500">
                Mouses
              </NavLink>
            </div>
            <div className="flex flex-col gap-3 text-gray-500">
              <NavLink to="/monitores" className="hover:text-blue-500">
                Monitores
              </NavLink>
            </div>
            <div className="flex flex-col gap-3 text-gray-500">
              <NavLink to="/audifonos" className="hover:text-blue-500">
                Audífonos
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xl text-gray-400 font-bold">Estamos en</p>
            <div className="flex gap-3 text-gray-500">
              <a href="/audifonos" className="hover:text-blue-500">
                Medellin
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-xl text-gray-400 font-bold">Nuestras Redes</p>
            <div className="flex gap-3">
              <SocialButton icon="/images/footer/facebook.svg" link="" />
              <SocialButton icon="/images/footer/instagram.svg" link="" />
              <SocialButton icon="/images/footer/twitter.svg" link="" />
              <SocialButton icon="/images/footer/youtube.svg" link="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-10/12 ContainerPrimary">
        <hr className="border-gray-400" />
        <br />
        <br />
        <p className="w-full text-center text-gray-400">© 2025 Tecnología R - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
