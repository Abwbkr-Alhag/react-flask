import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAdmin = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.isAdmin 
        ? <Outlet /> 
        : auth?.user 
        ? <Navigate to="/" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAdmin;