import React, { useEffect, useState } from "react";
import ImportantCards from "../components/home/ImportantCards";
import ArticlesCards from "../components/home/ArticlesCards";
import Stats from "../components/home/Stats";
import Charts from "../components/home/Charts";
import { getProducts } from "../services/getProducts";

export default function InitPage() {
  const { productos } = getProducts();

  return (
    <section className="init-page">
      <ImportantCards />
      <Stats productos={productos} />
      <Charts />
      <ArticlesCards productos={productos} />
    </section>
  );
}
