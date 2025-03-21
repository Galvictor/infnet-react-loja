import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;  // Exibe um carregamento até a verificação de autenticação ser concluída
    }

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return children;
};

export default ProtectedRoute;