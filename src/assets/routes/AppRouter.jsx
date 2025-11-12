import React from "react";
import { Route, Routes } from "react-router-dom";
import InitPage from "../pages/initpage";

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
    </Routes>
  );
}
