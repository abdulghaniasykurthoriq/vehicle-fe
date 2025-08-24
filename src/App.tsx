import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import VehicleDetail from "./pages/VehicleDetail";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/vehicles/:id", element: <VehicleDetail /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
