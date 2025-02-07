import react from "react";

const isAdmin = (admin) => (admin ? <i>Sim</i> : <i>Não</i>);

const UserCard = ({ user }) => {
  return (
    <div className="meu-card">
      <h1>
        Olá {user.nome}, Idade {user.idade}
      </h1>
      <h2>Admin: {isAdmin(user.admin)}</h2>
      <p>Profissão: {user.profissao}</p>
      <p>Cidade: {user.cidade}</p>
    </div>
  );
};

export default UserCard;
