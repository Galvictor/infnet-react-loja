import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../services/apiService";
import {useAuth} from "../contexts/AuthContext";
import {Container, Form, FormGroup, Label, Input, Button, Alert} from "reactstrap";

const Login = () => {
    const [credentials, setCredentials] = useState({username: "emilys", password: "emilyspass"});
    const [error, setError] = useState(null);
    const {login: authLogin} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(credentials);
            authLogin(userData); // Salva no contexto
            navigate("/users-list"); // Redireciona para a página protegida
        } catch (err) {
            setError("Usuário ou senha inválidos.");
        }
    };

    return (
        <Container className="mt-5">
            <h2>Login</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Label>Usuário</Label>
                    <Input
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        required
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                    Entrar
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
