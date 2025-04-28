import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/profile", { withCredentials: true }).then((res) => {
        setAuthenticated(true);

        setChecking(false);
      })
      .catch((err) => {
        setAuthenticated(false);
        setChecking(false);
      });
  }, []);

  if (checking) {
    return <p>Checking Authentication...</p>;
  }

  return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
