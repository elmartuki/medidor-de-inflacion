import { useState } from "react";
import {
  guardarEnLocalStorage,
  obtenerDelLocalStorage,
} from "../utils/localStorage";

export function addProducts(
  event,
  nombre,
  precio_hoy,
  precio_semana_1,
  precio_semana_2,
  precio_semana_3,
  precio_1_mes,
  precio_11_24,
  openForm
) {
  event.preventDefault();

  const nuevoProducto = {
    nombre,
    precio_hoy,
    precio_semana_1,
    precio_semana_2,
    precio_semana_3,
    precio_1_mes,
    precio_11_24,
  };

  const productos = obtenerDelLocalStorage("Productos") || [];

  const nuevoListado = [...productos, nuevoProducto];

  guardarEnLocalStorage("Productos", nuevoListado);


  console.log("Guardado:", nuevoProducto);
}
