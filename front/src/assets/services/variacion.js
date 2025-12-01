export function variacionConverter(productos, data_1, data_2) {
  if (!productos || productos.length === 0) {
    return {
      variacion: 0,
      total_hoy: 0,
    };
  }

  let total_hoy = 0;
  let total_semana_1 = 0;

  productos.forEach((producto) => {
    total_hoy += parseFloat(producto[data_1]) || 0;
    total_semana_1 += parseFloat(producto[data_2]) || 0;
  });

  if (total_semana_1 === 0) {
    return {
      variacion: 0,
      total_hoy,
    };
  }

  const variacion = ((total_hoy - total_semana_1) / total_semana_1) * 100;

  return {
    variacion: Number(variacion.toFixed(2)),
    total_hoy,
  };
}
