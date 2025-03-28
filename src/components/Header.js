import {Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse, Badge, Label, Input} from "reactstrap";
import {Link} from "react-router-dom";
import logo from "../assets/logotipo.png";
import {useState} from "react";
import LogoutButton from "../components/LogoutButton";
import {useAuth} from "../contexts/AuthContext";
import {useCart} from "../contexts/CartContext";
import {useTema} from "../contexts/TemaContext"; // Importe o hook do carrinho

export default function Header() {
    const {user} = useAuth();
    const {totalItems} = useCart(); // Obtenha o total de itens do carrinho
    const {temaEscuro, toggleTema} = useTema();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <header>
            <Navbar className="mb-2 py-4" color={temaEscuro ? "dark" : "light"} dark={temaEscuro} expand="md">
                <NavbarBrand tag={Link} to="/">
                    <div className="d-flex align-items-center">
                        <div>
                            <img style={{maxWidth: "200px"}} src={logo}
                                 className={`me-0 me-lg-4 img-fluid ${temaEscuro ? '' : 'logo-dark'}`} alt="Logo"/>
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
                            <NavLink tag={Link} to="/loja">Loja</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/cart" className="position-relative">
                                Carrinho
                                {totalItems > 0 && (
                                    <Badge
                                        color="danger"
                                        pill
                                        className="position-absolute top-0 start-100 translate-middle"
                                        style={{fontSize: '0.6rem'}}
                                    >
                                        {totalItems}
                                    </Badge>
                                )}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/users-list">Users List</NavLink>
                        </NavItem>
                        {user && (
                            <NavItem>
                                <LogoutButton/>
                            </NavItem>
                        )}
                        <NavItem className="d-flex align-items-center ms-3">
                            <div className="form-switch">
                                <Input
                                    type="switch"
                                    id="themeSwitch"
                                    checked={temaEscuro}
                                    onChange={toggleTema}
                                />
                                <Label for="themeSwitch" className="ms-2">
                                    {temaEscuro ? '🌙' : '☀️'}
                                </Label>
                            </div>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}