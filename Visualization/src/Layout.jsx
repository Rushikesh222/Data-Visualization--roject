import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  const sales = useSelector((state) => state.token);
  if (!sales) return <Navigate to="/" state={pathname} replace />;
  return <Outlet />;
};

export default Layout;
