import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import UserCard from "./components/UserCard";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Counter from "./components/Counter";

export default function App() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.npoint.io/04c44b2a36ab58dfebfc")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Error ao buscar dados");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <>
      <Header />
      <div className="container">
        <Counter />
        <div className="users">
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
        {/*<Form>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input id="nome" name="email" placeholder="Seu nome" type="email" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="seuemail@email.com"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="senha">Senha</Label>
          <Input
            id="senha"
            name="senha"
            placeholder="Sua senha"
            type="password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmar">Confirmar senha</Label>
          <Input
            invalid
            id="confirmar"
            name="confirmar"
            placeholder="Confirmar senha"
            type="password"
          />
          <FormFeedback invalid>Senha não é igual</FormFeedback>
        </FormGroup>
      </Form>*/}
      </div>
      <Footer />
    </>
  );
}
