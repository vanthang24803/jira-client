import { createBrowserRouter } from "react-router-dom";

import { Login, Register } from "@/pages/Auth";
import ProtectedRoute from "./protected-route";
import AuthLayout from "@/layouts/Auth";

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
]);

export default router;
