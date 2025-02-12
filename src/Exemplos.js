import React, {useEffect, useState} from "react";
import InputName from "./components/InputNome";
import Counter from "./components/Counter";
import UserCard from "./components/UserCard";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Exemplos = () => {

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

    return (
        <>
            <InputName/>
            <Counter/>
            {error ? ( // Se houver erro, exibe a mensagem de erro
                <p>Erro: {error}</p>
            ) : loading ? ( // Se estiver carregando, exibe "Carregando..."
                <p>Carregando...</p>
            ) : (
                // Se não houver erro e o carregamento estiver concluído, exibe os usuários
                <div className="users">
                    {users.map((user, index) => (
                        <UserCard key={index} user={user}/>
                    ))}
                </div>
            )}
        </>
    );
};

export default Exemplos;