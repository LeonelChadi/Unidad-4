import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Inicializar estado desde Local Storage
  const [direcciones, setDirecciones] = useState(() => {
    const guardadas = localStorage.getItem("abm_direcciones");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idActual, setIdActual] = useState(null);

  // Estado del formulario con todos los campos de la imagen
  const [formulario, setFormulario] = useState({
    coordenadas: "",
    calle: "",
    numero: "",
    piso: "",
    depto: "",
    ciudad: "",
    localidad: "",
    aclaraciones: "",
    alias: "",
  });

  // Guardar en Local Storage cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem("abm_direcciones", JSON.stringify(direcciones));
  }, [direcciones]);

  // Manejador de cambios en los inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // Abrir modal para Alta
  const abrirAlta = () => {
    setFormulario({
      coordenadas: "",
      calle: "",
      numero: "",
      piso: "",
      depto: "",
      ciudad: "",
      localidad: "",
      aclaraciones: "",
      alias: "",
    });
    setModoEdicion(false);
    setMostrarModal(true);
  };

  // Abrir modal para Modificación
  const abrirModificacion = (direccion) => {
    setFormulario(direccion);
    setIdActual(direccion.id);
    setModoEdicion(true);
    setMostrarModal(true);
  };

  // Baja (Eliminar)
  const eliminarDireccion = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta dirección?")) {
      setDirecciones(direcciones.filter((d) => d.id !== id));
    }
  };

  // Guardar (Alta o Modificación)
  const guardarDireccion = (e) => {
    e.preventDefault();

    // Validación básica de campos obligatorios (*)
    if (
      !formulario.coordenadas ||
      !formulario.calle ||
      !formulario.numero ||
      !formulario.ciudad ||
      !formulario.localidad ||
      !formulario.alias
    ) {
      alert("Por favor, completa todos los campos obligatorios (*).");
      return;
    }

    if (modoEdicion) {
      setDirecciones(
        direcciones.map((d) =>
          d.id === idActual ? { ...formulario, id: idActual } : d,
        ),
      );
    } else {
      setDirecciones([...direcciones, { ...formulario, id: Date.now() }]);
    }

    setMostrarModal(false);
  };

  return (
    <div className="app-container">
      <header className="header-principal">
        <h2>Mis Direcciones</h2>
        <button className="btn-primario" onClick={abrirAlta}>
          + Nueva Dirección
        </button>
      </header>

      {/* LISTADO DE DIRECCIONES */}
      <main className="lista-direcciones">
        {direcciones.length === 0 ? (
          <p className="mensaje-vacio">
            No hay direcciones guardadas. Agrega una nueva.
          </p>
        ) : (
          <table className="tabla-direcciones">
            <thead>
              <tr>
                <th>Alias</th>
                <th>Calle y N°</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {direcciones.map((dir) => (
                <tr key={dir.id}>
                  <td>
                    <strong>{dir.alias}</strong>
                  </td>
                  <td>
                    {dir.calle} {dir.numero} {dir.piso && `Piso ${dir.piso}`}{" "}
                    {dir.depto && `Dpto ${dir.depto}`}
                  </td>
                  <td>{dir.ciudad}</td>
                  <td className="acciones-td">
                    <button
                      className="btn-accion btn-editar"
                      onClick={() => abrirModificacion(dir)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-accion btn-borrar"
                      onClick={() => eliminarDireccion(dir.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* MODAL DEL PROTOTIPO (AGREGAR/EDITAR DIRECCIÓN) */}
      {mostrarModal && (
        <div className="overlay-modal">
          <div className="caja-modal">
            <div className="modal-header">
              <h3>
                {modoEdicion ? "Modificar dirección" : "Agregar dirección"}
              </h3>
              <button
                className="btn-cerrar-x"
                onClick={() => setMostrarModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={guardarDireccion} className="formulario-direccion">
              <div className="campo-completo">
                <label>Coordenadas *</label>
                <input
                  type="text"
                  name="coordenadas"
                  value={formulario.coordenadas}
                  onChange={manejarCambio}
                />
              </div>

              <div className="campo-completo">
                <label>Calle *</label>
                <input
                  type="text"
                  name="calle"
                  value={formulario.calle}
                  onChange={manejarCambio}
                />
              </div>

              <div className="fila-tres-columnas">
                <div className="campo-tercio">
                  <label>Número *</label>
                  <input
                    type="text"
                    name="numero"
                    value={formulario.numero}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="campo-tercio">
                  <label>Piso</label>
                  <input
                    type="text"
                    name="piso"
                    value={formulario.piso}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="campo-tercio">
                  <label>Depto</label>
                  <input
                    type="text"
                    name="depto"
                    value={formulario.depto}
                    onChange={manejarCambio}
                  />
                </div>
              </div>

              <div className="fila-dos-columnas">
                <div className="campo-mitad">
                  <label>Ciudad *</label>
                  <select
                    name="ciudad"
                    value={formulario.ciudad}
                    onChange={manejarCambio}
                  >
                    <option value="">Selecciona tu ciudad</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Córdoba">Córdoba</option>
                  </select>
                </div>
                <div className="campo-mitad">
                  <label>Localidad *</label>
                  <select
                    name="localidad"
                    value={formulario.localidad}
                    onChange={manejarCambio}
                  >
                    <option value="">Selecciona tu localidad</option>
                    <option value="Luján de Cuyo">Luján de Cuyo</option>
                    <option value="Godoy Cruz">Godoy Cruz</option>
                    <option value="Maipú">Maipú</option>
                  </select>
                </div>
              </div>

              <div className="campo-completo">
                <label>Aclaraciones</label>
                <input
                  type="text"
                  name="aclaraciones"
                  value={formulario.aclaraciones}
                  onChange={manejarCambio}
                />
              </div>

              <div className="campo-completo">
                <label>Alias *</label>
                <input
                  type="text"
                  name="alias"
                  value={formulario.alias}
                  onChange={manejarCambio}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
