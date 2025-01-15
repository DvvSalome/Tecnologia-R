import Navbar from "./Navbar";
import "../App.css";

const Header = () => {
  return (
    <div className="flex justify-end">
      <header className="fixed top-0 left-0 w-full bg-gray-700 bg-opacity-80 backdrop-blur-md nunito-sans-regular z-40">
        <div className="flex justify-between px-5 sm:px-10 items-center ContainerPrimary">
          <img
            src="/images/header/Logo Tecnologia R.png"
            alt="logo"
            className="w-56 sm:w-72"
          />
        </div>
      </header>
      <div className="z-50 mt-2.5 lg:mt-0 fixed items-center">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
