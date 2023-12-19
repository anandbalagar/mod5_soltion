// authGuard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("the token:", token);

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      console.log("Redirecting to login...");

      navigate("/");
    }
  }, [navigate, setIsAuthenticated]);

  return isAuthenticated ? children : null;
};

export default AuthGuard;
