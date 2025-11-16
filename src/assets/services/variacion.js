export function variacionConverter(productos, data_1, data_2) {
  let total_hoy = 0;
  let total_semana_1 = 0;

  productos.forEach((producto) => {
    total_hoy += producto[data_1];
    total_semana_1 += producto[data_2];
  });

  const variacion = ((total_hoy - total_semana_1) / total_semana_1) * 100;

  return {
    variacion: Number(variacion.toFixed(2)),
    total_hoy,
  };
}
