// useVariacionMensual.js

import { useState, useEffect } from "react";
// Importar las funciones de cálculo (ajusta la ruta si es necesario)
import {
  calcularVariacionIntermensualGlobal,
  calcularTasaAcumulada,
  calcularPromediosYVariacionesGlobales,
} from "../services/calculateInflacion.js";

/**
 * Hook personalizado para calcular y retornar la variación intermensual global.
 * @param {Array} productos - La lista de productos actuales.
 * @returns {number} La variación intermensual calculada (o 0 si falla).
 */
export function useVariacionMensual(productos) {
  const [variacionIntermensual, setVariacionIntermensual] = useState(0);

  // 🚨 El bloque useEffect se mueve aquí para encapsular la asincronía.
  useEffect(() => {
    async function obtenerVariacionMensual() {
      if (productos && productos.length > 0) {
        try {
          const resultado = await calcularVariacionIntermensualGlobal(
            productos,
            calcularPromediosYVariacionesGlobales,
            calcularTasaAcumulada
          );
          setVariacionIntermensual(resultado.variacion_intermensual_global);
        } catch (error) {
          console.error("Error al obtener la variación intermensual:", error);
          setVariacionIntermensual(0);
        }
      } else {
        setVariacionIntermensual(0); // Resetear si la lista de productos se vacía
      }
    }
    obtenerVariacionMensual();
  }, [productos]);

  return variacionIntermensual;
}
