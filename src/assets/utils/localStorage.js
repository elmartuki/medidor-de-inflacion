import { productos } from "../db/products";

export function guardarEnLocalStorage(key, datos) {
  const datosJSON = JSON.stringify(datos);
  localStorage.setItem(key, datosJSON);
}

export function obtenerDelLocalStorage(key) {
  const datos = localStorage.getItem(key);
  return datos ? JSON.parse(datos) : [];
}

export function agregarListado(key) {
  const checkear = obtenerDelLocalStorage(key);

  if (checkear?.length === null) {
    guardarEnLocalStorage(key, productos);
  }
}

export function agregarAlLocalStorage(key, nuevoDato) {
  const datosPrevios = obtenerDelLocalStorage(key) || [];
  const actualizados = [...datosPrevios, nuevoDato];
  guardarEnLocalStorage(key, actualizados);
}

export function guardarEnSessionStorage(key, datos) {
  const datosJSON = JSON.stringify(datos);
  sessionStorage.setItem(key, datosJSON);
}

export function obtenerDelSessionStorage(key) {
  const datos = sessionStorage.getItem(key);
  return datos ? JSON.parse(datos) : null;
}
