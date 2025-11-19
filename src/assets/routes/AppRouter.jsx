import React from "react";
import { Route, Routes } from "react-router-dom";
import InitPage from "../pages/InitPage";
import AdminPage from "../pages/AdminPage";
import Side_bar from "../components/sidebar/Aside";
import WeeksPage from "../pages/WeeksPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <InitPage />
          </>
        }
      ></Route>
      <Route
        path="/admin"
        element={
          <>
            <div style={{ display: "flex" }}>
              <Side_bar />
              <AdminPage />
            </div>
          </>
        }
      ></Route>
      <Route
        path="/weeks"
        element={
          <>
            <div style={{ display: "flex" }}>
              {" "}
              <Side_bar />
              <WeeksPage />
            </div>
          </>
        }
      ></Route>
    </Routes>
  );
}
