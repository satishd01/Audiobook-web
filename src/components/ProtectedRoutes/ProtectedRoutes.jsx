// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoutes = () => {
//   const user = localStorage.getItem("user");

//   try {
//     const parsedUser = JSON.parse(user);
//     return parsedUser?.email ? <Outlet /> : <Navigate to="/login" />;
//   } catch {
//     console.error("Invalid user data in localStorage.");
//     return <Navigate to="/login" />;
//   }
// };

// export default ProtectedRoutes;


import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem("token");

  // If the token exists, render the protected route
  if (token) {
    return <Outlet />;
  }

  // If the token does not exist, redirect to the login page
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
