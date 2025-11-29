// --- 1. Función Auxiliar: Variación Porcentual ---
/**
 * Calcula la variación porcentual entre dos precios.
 * Fórmula: ((Precio Actual - Precio Anterior) / Precio Anterior) * 100
 *
 * @param {number | string} precioActual El precio más reciente (e.g., precio_hoy).
 * @param {number | string} precioAnterior El precio del período anterior.
 * @returns {number} La variación porcentual redondeada a dos decimales.
 */
function calcularVariacion(precioActual, precioAnterior) {
  const actual = parseFloat(precioActual);
  const anterior = parseFloat(precioAnterior);

  // Verificación básica para evitar errores de división por cero o valores nulos
  if (isNaN(actual) || isNaN(anterior) || anterior === 0) {
    return 0;
  }

  const variacion = ((actual - anterior) / anterior) * 100;

  // Redondea a dos decimales, como se ve en tu diseño de tarjeta
  return parseFloat(variacion.toFixed(2));
}

// --- 2. Función Principal: Promedios y Variaciones Globales ---
/**
 * Calcula el precio promedio de todos los productos por período
 * y luego las variaciones globales (inflación de la canasta).
 *
 * @param {Array<Object>} productos Lista completa de objetos de productos
 * (debe contener los campos de tu esquema:
 * precio_hoy, precio_1_semana, etc.).
 * @returns {Object} Un objeto que contiene los promedios y todas las variaciones porcentuales.
 */
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

  // A. Calcular la suma total de precios por período
  const suma = productos.reduce(
    (acumulador, producto) => {
      acumulador.hoy += producto.precio_hoy || 0;
      acumulador.sem1 += producto.precio_1_semana || 0;
      acumulador.sem2 += producto.precio_2_semanas || 0;
      acumulador.sem3 += producto.precio_3_semanas || 0;
      acumulador.sem4 += producto.precio_4_semanas || 0; // 1 Mes
      acumulador.nov24 += producto.precio_11_24 || 0;
      return acumulador;
    },
    { hoy: 0, sem1: 0, sem2: 0, sem3: 0, sem4: 0, nov24: 0 }
  );

  // B. Calcular los promedios
  const promedios = {
    avg_hoy: suma.hoy / totalProductos,
    avg_1_semana: suma.sem1 / totalProductos,
    avg_2_semanas: suma.sem2 / totalProductos,
    avg_3_semanas: suma.sem3 / totalProductos,
    avg_4_semanas_mensual: suma.sem4 / totalProductos,
    avg_11_24: suma.nov24 / totalProductos,
  };

  // C. Calcular las variaciones usando el promedio de hoy vs. promedios anteriores
  const variaciones_globales = {
    // Variación respecto hace 1 semana
    variacion_1_semana: calcularVariacion(
      promedios.avg_hoy,
      promedios.avg_1_semana
    ),

    // Variación respecto hace 2 semanas
    variacion_2_semanas: calcularVariacion(
      promedios.avg_hoy,
      promedios.avg_2_semanas
    ),

    // Variación respecto hace 3 semanas
    variacion_3_semanas: calcularVariacion(
      promedios.avg_hoy,
      promedios.avg_3_semanas
    ),

    // Variación mensual (1 mes)
    variacion_mensual: calcularVariacion(
      promedios.avg_hoy,
      promedios.avg_4_semanas_mensual
    ),

    // Variación respecto al 11/24
    variacion_11_24: calcularVariacion(promedios.avg_hoy, promedios.avg_11_24),
  };

  return { promedios, variaciones_globales };
}
