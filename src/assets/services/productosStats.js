export function productoVariants(productos) {
  const productosQueSubieron = productos.filter(
    (producto) => producto.precio_hoy > producto.precio_semana_1
  ).length;

  const productosQueBajaron = productos.filter(
    (producto) => producto.precio_hoy < producto.precio_semana_1
  ).length;

  return {
    productosQueSubieron,
    productosQueBajaron,
  };
}

export function productoQueMasAumento(productos) {
  const productoAumento = productos.reduce((max, producto) => {
    const aumento = producto.precio_hoy - producto.precio_semana_1;
    const maxAumento = max.precio_hoy - max.precio_semana_1;
    return aumento > maxAumento ? producto : max;
  });

  const porcentajeAumento =
    ((productoAumento.precio_hoy - productoAumento.precio_semana_1) /
      productoAumento.precio_semana_1) *
    100;

  return { productoAumento, porcentajeAumento };
}

export function productoQueMasBajo(productos) {
  const productoBajada = productos.reduce((min, producto) => {
    const bajada = producto.precio_hoy - producto.precio_semana_1;
    const maxBajada = min.precio_hoy - min.precio_semana_1;
    return bajada < maxBajada ? producto : min;
  });

  const porcentajeBajada =
    ((productoBajada.precio_hoy - productoBajada.precio_semana_1) /
      productoBajada.precio_semana_1) *
    100;

  return { productoBajada, porcentajeBajada };
}
