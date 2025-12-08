import { NavLink } from "react-router-dom";
import dash from "../../img/dashboard.svg";
import product from "../../img/category.svg";
import week from "../../img/calendar.svg";

export default function Options(setOpenOptions) {
  return (
    <section className="options-section">
      <article className="options">
        <NavLink onClick={() => setOpenOptions(false)} to={"/"}>
          <img src={dash} alt="" /> Dashboard
        </NavLink>
        <NavLink onClick={() => setOpenOptions(false)} to={"/admin"}>
          <img src={product} alt="" />
          Productos
        </NavLink>
        <NavLink onClick={() => setOpenOptions(false)} to={"/weeks"}>
          <img src={week} alt="" />
          Semanas
        </NavLink>
      </article>
    </section>
  );
}
