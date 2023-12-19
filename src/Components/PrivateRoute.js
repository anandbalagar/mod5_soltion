// PrivateRoute.js
import React from 'react';
import { Navigate , Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
//const navigate =useNavigate();
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useAuth();
  
  
  return (
    <Routes>
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Navigate to="/first-factor"/>
      }
    />
    </Routes>
    
  );
};

export default PrivateRoute;
