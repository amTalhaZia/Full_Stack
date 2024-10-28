import { useAuth } from "../../store/AuthStore"; 
import { Navigate } from "react-router-dom"; 

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); 

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export { ProtectedRoute };
