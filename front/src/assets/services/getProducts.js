import { useEffect, useState } from "react";
import { BASEURL } from "../db/connectURL";

export function getProducts() {
  const [productos, setProductos] = useState([]);

  async function obtenerProductos() {
    try {
      const fetchResponse = await fetch(`${BASEURL}/api/productos`, {
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
