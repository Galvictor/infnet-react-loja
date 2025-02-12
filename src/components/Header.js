import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom"; // Importe o Link do react-router-dom
import logo from "../assets/logotipo.png";

export default function Header() {
    return (
        <header>
            <Navbar className="mb-2 py-4" color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    <img src={logo} className="me-4" alt="Logo" />
                    MIT - INFNET - Interfaces com React - João Victor
                </NavbarBrand>
                <Nav className="ms-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/">
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/exemplos">
                            Exemplos
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </header>
    );
}