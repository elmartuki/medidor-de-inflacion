export function calcularInflacionAcumulada(data) {
  let acumulado = 1;

  return data.map((item) => {
    const vari = typeof item.variacion === "number" ? item.variacion : 0;
    acumulado *= 1 + vari / 100;
    return {
      ...item,
      acumulado: +((acumulado - 1) * 100).toFixed(2),
    };
  });
}

export function filtrarSemanas(data, filtro) {
  const total = data.length;

  const filtros = {
    "1m": 4,
    "2m": 8,
    "4m": 16,
    "6m": 24,
    "1y": 52,
    all: total,
  };

  const cantidad = filtros[filtro] || total;
  const start = Math.max(0, total - cantidad);

  return data.slice(start);
}
