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

  const [isAsideExpanded, setIsAsideExpanded] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setIsAsideExpanded(true);
    } else {
      setIsAsideExpanded(false);
    }
  }, [isDesktop]);

  const handleToggleAside = () => {
    setIsAsideExpanded(!isAsideExpanded);
  };

  const handleCloseAsideMobile = () => {
    if (!isDesktop) {
      setIsAsideExpanded(false);
    }
  };

  const isMinimized = isDesktop && !isAsideExpanded;

  return (
    <>
      <button
        style={{ display: !isAsideExpanded && !isDesktop ? "block" : "none" }}
        className="menu-btn"
        onClick={handleToggleAside}
      >
        <img src={menu} alt="" />
      </button>

      <aside
        className={`${isMinimized ? "aside-minimized" : ""} ${
          !isDesktop && !isAsideExpanded ? "aside-hidden" : ""
        }`}
        style={{ display: isDesktop || isAsideExpanded ? "block" : "none" }}
      >
        <div className="aside-title">
          <button className="menu-btn" onClick={handleToggleAside}>
            <img src={menu} alt="" />
          </button>

          {!isMinimized && <p>Opciones</p>}
        </div>
        <div className="aside-elements">
          <NavLink onClick={handleCloseAsideMobile} to="/">
            <img src={dash} alt="" />

            {!isMinimized && "Dashboard"}
          </NavLink>
          <NavLink onClick={handleCloseAsideMobile} to="/admin">
            <img src={product} alt="" />
            {!isMinimized && "Productos"}
          </NavLink>
          <NavLink onClick={handleCloseAsideMobile} to="/weeks">
            <img src={week} alt="" />
            {!isMinimized && "Semanas"}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
