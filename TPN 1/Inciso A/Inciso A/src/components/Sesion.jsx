import { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";

const Sesion = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      {isLogin ? <Logout /> : <Login />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Cerrar sesión" : "Iniciar sesión"}
      </button>
    </div>
  );
};

export default Sesion;
