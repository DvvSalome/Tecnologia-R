import SocialButton from "../components/buttons/SocialButton";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white nunito-sans-regular">
      <div className="flex justify-around px-10 items-center ContainerPrimary">
        <img src="/images/header/Logo Tecnologia R.png" alt="logo" />
        <div></div>
        <div className="flex flex-col">
          <p>Nuestras Redes</p>
          <div className="flex">
          <SocialButton icon="/images/footer/facebook.svg" link="" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer