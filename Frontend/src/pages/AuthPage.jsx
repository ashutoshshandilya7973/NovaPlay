import React from "react";
import { useParams } from "react-router";
import AuthComponent from "../components/AuthComponent";

const AuthPage = () => {
  const {value} = useParams();
  return  <div className="">
    <AuthComponent value={value}/>
  </div> 
};

export default AuthPage;
