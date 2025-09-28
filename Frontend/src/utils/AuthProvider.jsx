import React, { useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router";
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const initAuth = useAuthStore((s) => s.initAuth);
  const loading = useAuthStore((s) => s.loading);
  const accessToken = useAuthStore((s) => s.accessToken);
//   console.log(loading)
//   console.log(accessToken)
  useEffect(() => {
    async function checkValidation() {
      await initAuth();
    }
    checkValidation();
  }, []);
  useEffect(() => {
    if (!loading && !accessToken) {
     console.log(accessToken)
      navigate("/auth/login");
    }
  }, [loading, accessToken, navigate]);

  if (loading) {
    return <div>checking session.....</div>;
  }

  return children;
};

export default AuthProvider;
