import ImportantCards from "../components/home/ImportantCards";
import ArticlesCards from "../components/home/ArticlesCards";
import Charts from "../components/home/Charts";
import { getProducts } from "../services/getProducts";
import "../css/importantCard.css";
import PrincipalCards from "../components/home/PrincipalCards";

export default function InitPage() {
  const { productos } = getProducts();

  return (
    <section className="init-page">
      <div className="flex-direction">
        <PrincipalCards productos={productos} />
        <ImportantCards />
      </div>

      <Charts />
      <ArticlesCards productos={productos} />
    </section>
  );
}
