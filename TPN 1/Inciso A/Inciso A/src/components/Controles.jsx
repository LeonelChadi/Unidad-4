const Controles = ({ setContador }) => {
  return (
    <div>
      <button onClick={() => setContador((prev) => prev + 1)}>
        Incrementar
      </button>
      <button onClick={() => setContador((prev) => prev - 1)}>
        Decrementar
      </button>
      <button onClick={() => setContador(0)}>Limpiar</button>
    </div>
  );
};

export default Controles;
