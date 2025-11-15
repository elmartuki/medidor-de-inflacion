import AppRouter from "./assets/routes/AppRouter";
import { guardarEnLocalStorage } from "./assets/utils/localStorage";
import { productos } from "./assets/db/products";
import { useEffect, useState } from "react";

export default function App() {
  const [moviesList, setMovieList] = useState([]);
  useEffect(() => {
    const raw = localStorage.getItem("Productos");
    if (raw === null) {
      setMovieList(productos);
      guardarEnLocalStorage("Productos", productos);
    } else {
      try {
        setMovieList(JSON.parse(raw) || []);
      } catch {
        setMovieList(productos);
        guardarEnLocalStorage("Productos", productos);
      }
    }
  }, []);
  return (
    <>
      <AppRouter moviesList={moviesList} />
    </>
  );
}
