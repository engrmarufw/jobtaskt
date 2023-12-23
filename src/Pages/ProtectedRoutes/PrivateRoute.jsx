import { Navigate, useLocation } from "react-router";
import Loader from "../Shared/Loader/Loader";
import useAuth from "../hooks/useAuth";



const PrivateRoute = ({ children }) => {
    const { currentUser, currentUserIsLoading } = useAuth()
    const location = useLocation();

    if (currentUserIsLoading) {
        return <Loader></Loader>
    }

    if (currentUser?.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;