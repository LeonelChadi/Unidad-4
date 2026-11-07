import Props from "./components/Props";
import Contador from "./components/Contador";
import Formulario from "./components/Formulario";
import MensajeCondicional from "./components/MensajeCondicional";
import Sesion from "./components/Sesion";
import ConsumoApi from "./components/ConsumoApi";

function App() {
  const nombre = "Juan";
  const apellidos = "Perez";

  return (
    <>
      <Props nombre={nombre} apellidos={apellidos} />
      <hr />
      <Contador />
      <hr />
      <Formulario />
      <hr />
      <MensajeCondicional />
      <hr />
      <Sesion />
      <hr />
      <ConsumoApi />
    </>
  );
}

export default App;
