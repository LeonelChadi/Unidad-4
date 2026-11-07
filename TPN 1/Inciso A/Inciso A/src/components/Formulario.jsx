import { useState } from "react";

const Formulario = () => {
  const [formData, setFormData] = useState({ nombre: "", apellido: "" });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    console.log(`Nombre: ${formData.nombre}, Apellido: ${formData.apellido}`);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Escribe tu nombre"
        value={formData.nombre}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="apellido"
        placeholder="Escribe tu apellido"
        value={formData.apellido}
        onChange={manejarCambio}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
