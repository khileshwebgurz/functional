import { Navigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user); 
        setChecking(false);
      })
      .catch(() => {
        setUser(null);
        setChecking(false);
      });
  }, []);

  if (checking) {
    return ;
  }

  // we are directly passing user to the childrens 
  return user ? (
    // clone and pass user as prop
    React.cloneElement(children, { user })
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
