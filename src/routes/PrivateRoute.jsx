import { Navigate, useLocation } from "react-router";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  // Redirect to login, but save the location they were trying to go to
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
