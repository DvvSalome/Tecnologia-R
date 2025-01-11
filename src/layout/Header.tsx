import Navbar from "./Navbar";
import "../App.css";

const Header = () => {
  return (
    <header className="bg-gray-700 nunito-sans-regular">
      <div className="flex justify-between px-10 items-center ContainerPrimary">
        <img src="/images/header/Logo Tecnologia R.png" alt="logo" />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
