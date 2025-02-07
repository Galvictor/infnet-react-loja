import { Navbar, NavbarBrand } from "reactstrap";
import logo from "../assets/logotipo.png";

export default function Header() {
  return (
    <header>
      <Navbar className="mb-2 py-4" color="dark" dark>
        <NavbarBrand href="/">
          <img src={logo} className="me-4" />
          MIT - INFNET - Interfaces com React
        </NavbarBrand>
      </Navbar>
    </header>
  );
}
