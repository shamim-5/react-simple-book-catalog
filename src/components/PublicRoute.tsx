import useAuth from "@/redux/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : <Navigate to="/" />;
}
