import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();  // Limpa o estado de autenticação no contexto
        navigate("/login");  // Redireciona para a página de login
    };

    return (
        <Button color="danger" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
