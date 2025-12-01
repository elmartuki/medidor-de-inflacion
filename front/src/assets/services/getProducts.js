import { useEffect, useState } from "react";

export function getProducts() {
  const [productos, setProductos] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  console.log("BASE_URL Cargada:", BASE_URL);

  async function obtenerProductos() {
    try {
      const fetchResponse = await fetch(`${BASE_URL}/api/productos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(fetchResponse);
      const apiResponse = await fetchResponse.json();
      setProductos(apiResponse.data || []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setProductos([]);
    }
  }
  useEffect(() => {
    obtenerProductos();
  }, []);

  return { productos, obtenerProductos };
}
