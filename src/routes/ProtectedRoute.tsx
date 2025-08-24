import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectAuth } from "../store/selectors";

export default function ProtectedRoute() {
  const { isAuth } = useAppSelector(selectAuth);
  if (!isAuth) return <Navigate to="/login" replace />;
  return <Outlet />;
}
