import { guardarEnLocalStorage } from "../utils/localStorage";

export function handleDelete(nombre, productos, setProductos) {
  const confirmar = confirm("¿Estás seguro que querés eliminar este producto?");

  if (confirmar) {
    const nuevoListado = productos.filter(
      (producto) => producto.nombre !== nombre
    );

    setProductos(nuevoListado);
    guardarEnLocalStorage("Productos", nuevoListado);
  }
}
