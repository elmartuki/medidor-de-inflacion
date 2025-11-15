import React from "react";
import { Route, Routes } from "react-router-dom";
import InitPage from "../pages/InitPage";
import AdminPage from "../pages/AdminPage";

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
            <AdminPage />
          </>
        }
      ></Route>
    </Routes>
  );
}
