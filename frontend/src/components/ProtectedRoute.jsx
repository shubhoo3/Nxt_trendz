import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ element }) => {
    const token = Cookie.get('jwt_token');

    // If the token doesn't exist, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If the token exists, render the protected component
    return element;
};

export default ProtectedRoute;
