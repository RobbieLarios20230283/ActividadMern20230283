import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <NavLink
        to="/crud1"
        className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
      >
        Empleado
      </NavLink>
      <NavLink
        to="/crud2"
        className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
      >
        Cliente
      </NavLink>
      <NavLink
        to="/crud3"
        className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
      >
        Productos
      </NavLink>
    </nav>
  );
}
