import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, initialized } = useAuth();

  if (!initialized) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
