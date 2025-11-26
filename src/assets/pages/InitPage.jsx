import React from "react";
import ImportantCards from "../components/home/ImportantCards";
import ArticlesCards from "../components/home/ArticlesCards";
import Stats from "../components/home/Stats";
import { obtenerDelLocalStorage } from "../utils/localStorage";
import Charts from "../components/home/Charts";

export default function InitPage() {
  const productos = obtenerDelLocalStorage("Productos") || [];
  return (
    <>
      <ImportantCards />
      <Stats productos={productos} />
      <Charts />
      <ArticlesCards />
    </>
  );
}
