import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../css/aside.css";
import dash from "../../img/dashboard.svg";
import product from "../../img/category.svg";
import week from "../../img/calendar.svg";
import menu from "../../img/menu.svg";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export default function Aside() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [openAside, setOpenAside] = useState(false);

  function handleCloseMenu() {
    setOpenAside(false);
  }

  function handleOpenMenu() {
    setOpenAside(true);
  }

  useEffect(() => {
    if (isDesktop) {
      setOpenAside(false);
    }
  }, [isDesktop]);

  function handleCloseAside() {
    if (!isDesktop) {
      setOpenAside(false);
    }
  }

  function handleOpenAside() {
    setOpenAside(true);
  }

  return (
    <>
      <button
        style={{ display: openAside && !isDesktop ? "none" : "block" }}
        className="menu-btn"
        onClick={handleOpenMenu}
      >
        <img src={menu} alt="" />
      </button>

      <aside style={{ display: openAside ? "block" : "none" }}>
        <div className="aside-title">
          <button className="menu-btn" onClick={handleCloseMenu}>
            <img src={menu} alt="" />
          </button>

          <p>Admin Panel</p>
        </div>
        <div className="aside-elements">
          <NavLink onClick={handleCloseAside} to="/">
            <img src={dash} alt="" />
            Dashboard
          </NavLink>
          <NavLink onClick={handleCloseAside} to="/admin">
            <img src={product} alt="" />
            Productos
          </NavLink>
          <NavLink onClick={handleCloseAside} to="/weeks">
            <img src={week} alt="" />
            Semanas
          </NavLink>
        </div>
      </aside>
    </>
  );
}
