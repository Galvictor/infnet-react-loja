import {Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse} from "reactstrap";
import {Link} from "react-router-dom"; // Importe o Link do react-router-dom
import logo from "../assets/logotipo.png";
import {useState} from "react";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header>
            <Navbar className="mb-2 py-4" color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    <div className="d-flex align-items-center">
                        <div>
                            <img style={
                                {
                                    maxWidth: "200px",
                                }
                            } src={logo} className="me-0 me-lg-4 img-fluid" alt="Logo"/>
                        </div>
                        <div className="d-none d-lg-block">MIT - INFNET - Interfaces com React - João Victor</div>
                    </div>
                </NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
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
                </Collapse>
            </Navbar>
        </header>
    );
}