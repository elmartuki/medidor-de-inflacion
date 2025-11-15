export function handleSearch(search, productos) {
  if (!search.trim()) return productos;

  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );
}
