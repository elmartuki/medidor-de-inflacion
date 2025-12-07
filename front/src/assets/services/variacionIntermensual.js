import { getProducts } from "./getProducts";
import { getSemanas } from "./getSemanas";

export function calcularIntermensual() {
  const listadoSemanas = getSemanas();
  const ultimas3semanas = listadoSemanas.semanas.slice(-3);
  const variaciones = ultimas3semanas.map((semana) => {
    return semana.variacion;
  });

  function obtenerProductos() {
    const obtenerProductos = getProducts();
    const listadoProductos = obtenerProductos.productos;
    return listadoProductos;
  }
  const productos = obtenerProductos();

  const precio_hoy_total = productos.reduce((acumulador, producto) => {
    return acumulador + producto.precio_hoy;
  }, 0);

  const precio_1_semana_total = productos.reduce((acumulador, producto) => {
    return acumulador + producto.precio_1_semana;
  }, 0);

  const variacion =
    ((precio_hoy_total - precio_1_semana_total) / precio_1_semana_total) * 100;

  const variacionToFixed = variacion.toFixed(2);

  const totalSemanas = [...variaciones, Number(variacionToFixed)];

  const sumaTotal = totalSemanas.reduce((acumulador, semana) => {
    return acumulador + semana;
  }, 0);

  const promedio = sumaTotal / 4;

  return promedio.toFixed(2);
}
