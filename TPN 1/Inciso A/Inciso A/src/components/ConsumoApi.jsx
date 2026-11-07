import { useState, useEffect } from "react";

const ConsumoApi = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const respuesta = await fetch("https://api.sampleapis.com/beers/ale");
      const json = await respuesta.json();
      setData(json);
    } catch (error) {
      setData({ error: error.message });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ConsumoApi;
