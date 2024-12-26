import React from "react";
import {Navigate, replace } from "react-router-dom";
import {getToken } from "../formHandler/useFormData"

const ProtectedRoute = ({children}) => {
    const token = getToken();
    if(!token)
    {
        return <Navigate to={'/SignIn'} replace/>
    };
    return children;
}

export default ProtectedRoute;