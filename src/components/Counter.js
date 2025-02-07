import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center mb-4">
      <h3>Contador</h3>
      <p>Valor: {count}</p>
      <button
        className="btn btn-success me-2"
        onClick={() => setCount(count + 1)}
      >
        Incrementar
      </button>
      <button className="btn btn-danger" onClick={() => setCount(count - 1)}>
        Decrementar
      </button>
    </div>
  );
}
