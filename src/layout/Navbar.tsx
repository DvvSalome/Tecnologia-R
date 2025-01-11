import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos" },
    { name: "Contacto", path: "/contacto" },
    { name: "Nosotros", path: "/nosotros" },
  ];

  return (
    <nav>
      <ul className="flex space-x-4">
        {navLinks.map((link) => (
          <li key={link.path} className="text-xl font-semibold">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-b from-green-400 to-blue-400 bg-clip-text text-transparent p-2 rounded font-bold"
                  : "text-white p-2 rounded hover:ring-2 hover:ring-blue-400"
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;