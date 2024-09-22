import { createBrowserRouter } from "react-router-dom";

import { Login, Register } from "@/pages/Auth";
import ProtectedRoute from "./protected-route";
import AuthLayout from "@/layouts/Auth";
import Projects from "@/pages/Dashboard/Project";
import DashboardLayout from "@/layouts/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/project",
        element: <Projects />,
      },
    ],
  },
]);

export default router;
