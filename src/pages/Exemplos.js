import React, {useEffect, useState} from "react";
import InputName from "../components/InputNome";
import Counter from "../components/Counter";
import UserCard from "../components/UserCard";
import Timer from "../components/Timer";

const Exemplos = () => {

    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isRunning, setIsRunning] = useState(false);

    const handleTimer = (run) => {
        setIsRunning(run);
    };

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
            <Timer isRunning={isRunning}/>
            <div className="text-center mb-4">
                <button
                    className="btn btn-success me-2"
                    onClick={() => handleTimer(true)}
                >
                    Start
                </button>
                <button className="btn btn-danger" onClick={() => handleTimer(false)}>
                    Stop
                </button>
            </div>
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