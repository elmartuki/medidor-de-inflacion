import { useEffect, useState } from "react";

export function getSemanas() {
  const [semanas, setSemanas] = useState([]);

  async function obtenerSemanas() {
    try {
      const fetchResponse = await fetch("http://localhost:3000/api/semanas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const apiResponse = await fetchResponse.json();
      setSemanas(apiResponse.data || []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setSemanas([]);
    }
  }

  useEffect(() => {
    obtenerSemanas();
  }, []);

  return { semanas, setSemanas, obtenerSemanas };
}
