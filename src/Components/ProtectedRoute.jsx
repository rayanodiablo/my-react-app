import React from "react";
import {Navigate, replace } from "react-router-dom";
import {getToken } from "../controller/controller"

const ProtectedRoute = ({children}) => {
    const token = getToken("accessToken");
    if(!token)
    {
        return <Navigate to={'/SignIn'} replace/>
    };
    return children;
}

export default ProtectedRoute;