const DEFAULT_PRODUCT_STAT = {
  nombre: "N/A",
  precio_hoy: 0,
  precio_1_semana: 0,
};

export function productoVariants(productos) {
  if (!productos || productos.length === 0) {
    return {
      productosQueSubieron: 0,
      productosQueBajaron: 0,
    };
  }

  const productosQueSubieron = productos.filter(
    (producto) =>
      (parseFloat(producto.precio_hoy) || 0) >
      (parseFloat(producto.precio_1_semana) || 0)
  ).length;

  const productosQueBajaron = productos.filter(
    (producto) =>
      (parseFloat(producto.precio_hoy) || 0) <
      (parseFloat(producto.precio_1_semana) || 0)
  ).length;

  return {
    productosQueSubieron,
    productosQueBajaron,
  };
}

export function productoQueMasAumento(productos) {
  if (!productos || productos.length === 0) {
    return { productoAumento: DEFAULT_PRODUCT_STAT, porcentajeAumento: 0 };
  }

  const productoAumento = productos.reduce((max, producto) => {
    const precioHoy = parseFloat(producto.precio_hoy) || 0;
    const precioSemana1 = parseFloat(producto.precio_1_semana) || 0;
    const maxPrecioHoy = parseFloat(max.precio_hoy) || 0;
    const maxPrecioSemana1 = parseFloat(max.precio_1_semana) || 0;

    const aumento = precioHoy - precioSemana1;
    const maxAumento = maxPrecioHoy - maxPrecioSemana1;

    return aumento > maxAumento ? producto : max;
  }, productos[0]);

  const precioAnterior = parseFloat(productoAumento.precio_1_semana) || 1;

  const porcentajeAumento =
    ((parseFloat(productoAumento.precio_hoy) - precioAnterior) /
      precioAnterior) *
    100;

  return { productoAumento, porcentajeAumento };
}

export function productoQueMasBajo(productos) {
  if (!productos || productos.length === 0) {
    return { productoBajada: DEFAULT_PRODUCT_STAT, porcentajeBajada: 0 };
  }

  const productoBajada = productos.reduce((min, producto) => {
    const precioHoy = parseFloat(producto.precio_hoy) || 0;
    const precioSemana1 = parseFloat(producto.precio_1_semana) || 0;
    const minPrecioHoy = parseFloat(min.precio_hoy) || 0;
    const minPrecioSemana1 = parseFloat(min.precio_1_semana) || 0;

    const bajada = precioHoy - precioSemana1;
    const maxBajada = minPrecioHoy - minPrecioSemana1;

    return bajada < maxBajada ? producto : min;
  }, productos[0]);

  const precioAnterior = parseFloat(productoBajada.precio_1_semana) || 1;

  const porcentajeBajada =
    ((parseFloat(productoBajada.precio_hoy) - precioAnterior) /
      precioAnterior) *
    100;

  return { productoBajada, porcentajeBajada };
}
