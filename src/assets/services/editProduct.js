import { guardarEnLocalStorage } from "../utils/localStorage";

export function handleSubmit(event, index, productos, setProductos) {
  event.preventDefault();

  guardarEnLocalStorage("Productos", productos);

  const nombreProducto = productos[index].nombre;
  alert(`Producto "${nombreProducto}" actualizado con éxito`);
}

export const handleChange = (index, campo, valor, productos, setProductos) => {
  const nuevosProductos = [...productos];
  nuevosProductos[index][campo] = valor;
  setProductos(nuevosProductos);
};
