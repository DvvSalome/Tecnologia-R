import Navbar from "./Navbar";
import "../App.css";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-700 bg-opacity-80 backdrop-blur-md nunito-sans-regular z-50">
      <div className="flex justify-between px-10 items-center ContainerPrimary">
        <img src="/images/header/Logo Tecnologia R.png" alt="logo" className="w-7/12 sm:w-72" />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
