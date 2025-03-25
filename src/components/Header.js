import {Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse} from "reactstrap";
import {Link} from "react-router-dom";
import logo from "../assets/logotipo.png";
import {useState} from "react";
import LogoutButton from "../components/LogoutButton";
import {useAuth} from "../contexts/AuthContext"; // Importe o componente de logout

export default function Header() {
    const {user} = useAuth(); // Obtém o estado de usuário do contexto
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <header>
            <Navbar className="mb-2 py-4" color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    <div className="d-flex align-items-center">
                        <div>
                            <img style={{maxWidth: "200px"}} src={logo} className="me-0 me-lg-4 img-fluid" alt="Logo"/>
                        </div>
                        <div className="d-none d-lg-block">
                            Projeto de Front-end com React [25E1_3] - João Victor
                        </div>
                    </div>
                </NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto align-items-center" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/todo">Todo</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/data">Data</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/loja">Loja</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/cart">Cart</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/users-list">Users List</NavLink>
                        </NavItem>
                        {user && (
                            <NavItem>
                                <LogoutButton/>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}
