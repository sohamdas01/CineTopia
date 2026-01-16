

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Loading from "../../components/Loading";

const Layout = () => {
  const { isLoaded, user } = useAppContext();

  if (!isLoaded) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;