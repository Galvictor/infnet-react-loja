import React, {useState} from "react";
import {Form, FormGroup, Label, Input, Button, Alert, Container, Row, Col} from "reactstrap";
import {login} from "../services/apiService";

const Login = () => {
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await login(credentials);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            alert(`Bem-vindo, ${data.firstName} ${data.lastName}!`);
        } catch (err) {
            setError("Falha no login. Verifique suas credenciais e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">Login</h2>
                    {error && <Alert color="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">Usuário (ex: emilys)</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Digite seu usuário (ex: emilys)"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Senha (ex: emilyspass)</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Digite sua senha (ex: emilyspass)"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <Button color="primary" type="submit" block disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;