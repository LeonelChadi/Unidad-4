import { useState } from "react";
import Controles from "./Controles";

const Contador = () => {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho click {contador} veces</p>
      <Controles setContador={setContador} />
    </div>
  );
};

export default Contador;
