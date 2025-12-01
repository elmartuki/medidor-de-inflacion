import { useEffect, useState } from "react";
import { BASEURL } from "../db/connectURL";

export function getSemanas() {
  const [semanas, setSemanas] = useState([]);

  async function obtenerSemanas() {
    try {
      const fetchResponse = await fetch(`${BASEURL}/api/semanas`, {
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
