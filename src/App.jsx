import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import "../src/tailwind.css";
import Index from "./features/Home/Index";
import Layout from "./features/Layout/Layout";
import { useSelector } from "react-redux";
import Protected from "./features/Auth/Protected";
import moment from "moment-timezone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRoutes from "./features/Routes/AuthRoutes";
import PublicRoutes from "./features/Routes/PublicRoutes";

function App() {
  moment.tz.setDefault();
  const store_token = useSelector((state) => state.auth.JWTtoken);
  const storage_token = localStorage.getItem("token");

  return (
    <Layout>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
        style={{ zIndex: 9999 }}
      />
      {!!store_token || !!storage_token ? (
        <Protected>
          <AuthRoutes />
        </Protected>
      ) : (
        <PublicRoutes />
      )}
    </Layout>
  );
}

export default App;
