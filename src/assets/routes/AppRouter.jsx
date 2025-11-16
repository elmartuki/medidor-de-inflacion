import React from "react";
import { Route, Routes } from "react-router-dom";
import InitPage from "../pages/InitPage";
import AdminPage from "../pages/AdminPage";
import Side_bar from "../components/sidebar/Side_bar";
import Weeks_admin from "../components/admin/Weeks_admin";

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
            <Side_bar />
            <AdminPage />
          </>
        }
      ></Route>
      <Route
        path="/weeks"
        element={
          <>
            <Side_bar />
            <Weeks_admin />
          </>
        }
      ></Route>
    </Routes>
  );
}
