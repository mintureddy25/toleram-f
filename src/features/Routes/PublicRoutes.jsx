import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import Index from "../Home/Index";
import TeamPlayers from "../Teams/Index";

function PublicRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/team/:teamId" Component={TeamPlayers} />
        <Route path="*" Component={Index} />
      </Routes>
    </>
  );
}

export default PublicRoutes;
