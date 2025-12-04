import Products_admin from "../components/admin/Products_admin";
import { getProducts } from "../services/getProducts";

export default function AdminPage() {
  const { productos, obtenerProductos, setProductos } = getProducts();
  return (
    <>
      <Products_admin
        listaDeProductos={productos}
        setProductos={setProductos}
        onProductUpdate={obtenerProductos}
      />
    </>
  );
}
