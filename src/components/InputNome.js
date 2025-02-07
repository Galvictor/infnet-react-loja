import { useState } from "react";

export default function InputName() {
  const [nome, setNome] = useState("visitante");

  return (
    <div className="text-center">
      <input
        placeholder="Digite seu nome"
        type="text"
        onChange={(e) => setNome(e.target.value)}
      />
      <p>Olá, {nome}</p>
    </div>
  );
}
