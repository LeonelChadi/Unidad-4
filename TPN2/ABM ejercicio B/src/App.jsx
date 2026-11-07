import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 1. Inicializar estado desde Local Storage o con datos por defecto del prototipo
  const [paises, setPaises] = useState(() => {
    const guardados = localStorage.getItem("abm_paises");
    if (guardados) {
      return JSON.parse(guardados);
    }
    // Datos por defecto basados en el wireframe
    return [
      { id: 1, nombre: "Chile" },
      { id: 2, nombre: "Perú" },
      { id: 3, nombre: "Uruguay" },
    ];
  });

  // Estado para controlar qué pantalla se está viendo ('lista', 'alta', 'modificar', 'baja')
  const [vistaActual, setVistaActual] = useState("lista");

  // Estados auxiliares para los formularios
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [inputNombre, setInputNombre] = useState("");

  // 2. Efecto para guardar en Local Storage cada vez que la lista de países cambia
  useEffect(() => {
    localStorage.setItem("abm_paises", JSON.stringify(paises));
  }, [paises]);

  // --- MANEJADORES DE NAVEGACIÓN ---
  const irALista = () => {
    setVistaActual("lista");
    setPaisSeleccionado(null);
    setInputNombre("");
  };

  const abrirAlta = () => {
    setInputNombre("");
    setVistaActual("alta");
  };

  const abrirModificacion = (pais) => {
    setPaisSeleccionado(pais);
    setInputNombre(pais.nombre);
    setVistaActual("modificar");
  };

  const abrirBaja = (pais) => {
    setPaisSeleccionado(pais);
    setVistaActual("baja");
  };

  // --- MANEJADORES DE ACCIONES (ABM) ---
  const confirmarAlta = () => {
    if (!inputNombre.trim()) return; // Evitar vacíos
    const nuevoPais = {
      id: Date.now(), // ID único simple
      nombre: inputNombre,
    };
    setPaises([...paises, nuevoPais]);
    irALista();
  };

  const confirmarModificacion = () => {
    if (!inputNombre.trim()) return;
    const listaActualizada = paises.map((p) =>
      p.id === paisSeleccionado.id ? { ...p, nombre: inputNombre } : p,
    );
    setPaises(listaActualizada);
    irALista();
  };

  const confirmarBaja = () => {
    const listaFiltrada = paises.filter((p) => p.id !== paisSeleccionado.id);
    setPaises(listaFiltrada);
    irALista();
  };

  // --- RENDERIZADO DE PANTALLAS ---

  // PANTALLA PRINCIPAL (Grilla)
  if (vistaActual === "lista") {
    return (
      <div className="contenedor-principal">
        <button className="btn-alta" onClick={abrirAlta}>
          Alta
        </button>
        <table className="tabla-paises">
          <thead>
            <tr>
              <th>Modificar</th>
              <th>Baja</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {paises.map((pais) => (
              <tr key={pais.id}>
                <td className="celda-accion">
                  <button
                    className="btn-radio"
                    onClick={() => abrirModificacion(pais)}
                  ></button>
                </td>
                <td className="celda-accion">
                  <button
                    className="btn-radio"
                    onClick={() => abrirBaja(pais)}
                  ></button>
                </td>
                <td>{pais.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // PANTALLA DE ALTA
  if (vistaActual === "alta") {
    return (
      <div className="contenedor-modal">
        <fieldset className="caja-formulario">
          <legend>Alta País</legend>
          <div className="campo-formulario">
            <label>Nombre:</label>
            <input
              type="text"
              value={inputNombre}
              onChange={(e) => setInputNombre(e.target.value)}
              autoFocus
            />
          </div>
          <div className="botones-formulario">
            <button onClick={confirmarAlta}>Aceptar</button>
            <button onClick={irALista}>Cancelar</button>
          </div>
        </fieldset>
      </div>
    );
  }

  // PANTALLA DE MODIFICACIÓN
  if (vistaActual === "modificar") {
    return (
      <div className="contenedor-modal">
        <fieldset className="caja-formulario">
          <legend>Modificar País</legend>
          <div className="campo-formulario">
            <label>Nombre:</label>
            <input
              type="text"
              value={inputNombre}
              onChange={(e) => setInputNombre(e.target.value)}
              autoFocus
            />
          </div>
          <div className="botones-formulario">
            <button onClick={confirmarModificacion}>Aceptar</button>
            <button onClick={irALista}>Cancelar</button>
          </div>
        </fieldset>
      </div>
    );
  }

  // PANTALLA DE BAJA
  if (vistaActual === "baja") {
    return (
      <div className="contenedor-modal">
        <fieldset className="caja-formulario">
          <legend>Baja de País</legend>
          <p className="texto-confirmacion">
            ¿Está seguro que desea dar de baja el país{" "}
            <strong>{paisSeleccionado?.nombre}</strong>?
          </p>
          <div className="botones-formulario">
            <button onClick={confirmarBaja}>Aceptar</button>
            <button onClick={irALista}>Cancelar</button>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default App;
