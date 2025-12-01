function calcularVariacion(precioActual, precioAnterior) {
  const actual = parseFloat(precioActual);
  const anterior = parseFloat(precioAnterior);

  if (isNaN(actual) || isNaN(anterior) || anterior === 0) {
    return 0;
  }

  const variacion = ((actual - anterior) / anterior) * 100;

  return parseFloat(variacion.toFixed(2));
}

export function calcularPromediosYVariacionesGlobales(productos) {
  const totalProductos = productos.length;

  if (totalProductos === 0) {
    return {
      variaciones_globales: {
        variacion_1_semana: 0,
        variacion_2_semanas: 0,
        variacion_3_semanas: 0,
        variacion_mensual: 0,
        variacion_11_24: 0,
      },
    };
  }

  const suma = productos.reduce(
    (acumulador, producto) => {
      acumulador.hoy += producto.precio_hoy || 0;
      acumulador.sem1 += producto.precio_1_semana || 0;
      acumulador.sem2 += producto.precio_2_semanas || 0;
      acumulador.sem3 += producto.precio_3_semanas || 0;
      acumulador.sem4_mensual += producto.precio_4_semanas || 0;
      acumulador.nov24 += producto.precio_11_24 || 0;
      return acumulador;
    },
    { hoy: 0, sem1: 0, sem2: 0, sem3: 0, sem4_mensual: 0, nov24: 0 }
  );

  const promedios = {
    avg_hoy: suma.hoy / totalProductos,
    avg_1_semana: suma.sem1 / totalProductos,
    avg_2_semanas: suma.sem2 / totalProductos,
    avg_3_semanas: suma.sem3 / totalProductos,
    avg_4_semanas_mensual: suma.sem4_mensual / totalProductos,
    avg_11_24: suma.nov24 / totalProductos,
  };

  const variaciones_globales = {
    variacion_1_semana: calcularVariacion(
      promedios.avg_hoy,
      promedios.avg_1_semana
    ),

    variacion_2_semanas: calcularVariacion(
      promedios.avg_1_semana,
      promedios.avg_2_semanas
    ),

    variacion_3_semanas: calcularVariacion(
      promedios.avg_2_semanas,
      promedios.avg_3_semanas
    ),

    variacion_mensual: calcularVariacion(
      promedios.avg_hoy,
      promedios.avg_4_semanas_mensual
    ),

    variacion_11_24: calcularVariacion(promedios.avg_hoy, promedios.avg_11_24),
  };

  return { promedios, variaciones_globales };
}
