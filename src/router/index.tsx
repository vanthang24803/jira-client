import { createBrowserRouter } from "react-router-dom";

import { Login, Register } from "@/pages/Auth";
import ProtectedRoute from "./protected-route";
import AuthLayout from "@/layouts/Auth";
import Projects from "@/pages/Dashboard/Project";
import DashboardLayout from "@/layouts/Dashboard";
import ProjectBoard from "@/pages/Dashboard/Project/_id";
import ProjectLayout from "@/layouts/Project";
import ProjectSetting from "@/pages/Dashboard/Project/setting";

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
      {
        path: "/dashboard/project/:slug/board",
        element: (
          <ProjectLayout>
            <ProjectBoard />
          </ProjectLayout>
        ),
      },
      {
        path: "/dashboard/project/:slug/setting",
        element: (
          <ProjectLayout>
            <ProjectSetting />
          </ProjectLayout>
        ),
      },
    ],
  },
]);

export default router;
