import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function ProtectedPage({ children }) {
  const { isAuth } = useAuth();
  console.log(isAuth);

  if (!isAuth) return <Navigate to="/signin" />;

  return children ? children : <Outlet />;
}

export default ProtectedPage;
