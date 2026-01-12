// import React, { useEffect } from 'react'
// import AdminNavbar from '../../components/admin/AdminNavbar'
// import AdminSidebar from '../../components/admin/AdminSidebar'
// import { Outlet } from 'react-router-dom'
// import { useAppContext } from '../../context/AppContext'
// import Loading from '../../components/Loading'

// const Layout = () => {

//   const {isAdmin, fetchIsAdmin} = useAppContext()

//   useEffect(()=>{
//     fetchIsAdmin()
//   },[])

//   return isAdmin ? (
//     <>
//       <AdminNavbar />
//       <div className='flex'>
//         <AdminSidebar/>
//         <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
//             <Outlet />
//         </div>
//       </div>
//     </>
//   ) : <Loading/>
// }

// export default Layout

// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import AdminNavbar from "../../components/admin/AdminNavbar";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import { useAppContext } from "../../context/AppContext";
// import Loading from "../../components/Loading";

// const Layout = () => {
//   const { isAdmin, isLoaded } = useAppContext();

//   // Wait for Clerk + metadata
//   if (!isLoaded) {
//     return <Loading />;
//   }

//   // ⛔ Signed-in but not admin
//   if (!isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

// import React from "react";
// import { Outlet } from "react-router-dom";
// import AdminNavbar from "../../components/admin/AdminNavbar";
// import AdminSidebar from "../../components/admin/AdminSidebar";

// const Layout = () => {
//   return (
//     <>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAppContext } from "../../context/AppContext";
// import AdminNavbar from "../../components/admin/AdminNavbar";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import Loading from "../../components/Loading";

// const Layout = () => {
//   const { isLoaded, user, isAdmin } = useAppContext();

//   // ⏳ Wait for Clerk
//   if (!isLoaded) return <Loading />;

//   // 🔐 Not signed in
//   if (!user) {
//     return <Navigate to="/sign-in" replace />;
//   }

//   // ⛔ Signed in but not admin
//   if (!isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   // ✅ Admin UI
//   return (
//     <>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAppContext } from "../../context/AppContext";
// import AdminNavbar from "../../components/admin/AdminNavbar";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import Loading from "../../components/Loading";

// const Layout = () => {
//   const { isLoaded, user, isAdmin } = useAppContext();

//   // Wait for Clerk to load
//   if (!isLoaded) {
//     return <Loading />;
//   }

//   // Not signed in
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }

//   // Signed in but not admin
//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
//           <div className="text-6xl mb-4">⛔</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
//           <p className="text-gray-600 mb-6">
//             You don't have permission to access the admin panel.
//           </p>
//           <button
//             onClick={() => window.location.href = '/'}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Admin UI
//   return (
//     <>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

// import { Outlet } from "react-router-dom";
// import AdminNavbar from "../../components/admin/AdminNavbar";
// import AdminSidebar from "../../components/admin/AdminSidebar";

// const Layout = () => {
//   return (
//     <>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 px-6 py-8 overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;




// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAppContext } from "../../context/AppContext";
// import AdminNavbar from "../../components/admin/AdminNavbar";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import Loading from "../../components/Loading";

// const Layout = () => {
//   const { isLoaded, user, isAdmin } = useAppContext();

//   // Wait for Clerk to load
//   if (!isLoaded) {
//     return <Loading />;
//   }

//   // Not signed in
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }

//   // Signed in but not admin
//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
//           <div className="text-6xl mb-4">⛔</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
//           <p className="text-gray-600 mb-6">
//             You don't have permission to access the admin panel.
//           </p>
//           <button
//             onClick={() => window.location.href = '/'}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Admin UI
//   return (
//     <>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

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