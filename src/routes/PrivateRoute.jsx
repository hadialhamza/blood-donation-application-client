import { Navigate, useLocation } from "react-router";
import Loading from "../components/shared/Loading";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  // Redirect to login, but save the location they were trying to go to
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
