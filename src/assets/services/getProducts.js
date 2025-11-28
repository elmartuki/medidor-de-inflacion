import { useEffect, useState } from "react";

export function getProducts() {
  const [productos, setProductos] = useState([]);

  async function obtenerProductos() {
    try {
      const fetchResponse = await fetch(
        "http://localhost:3000/api/productos/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
