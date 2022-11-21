import React, {useEffect} from 'react';
import { Redirect } from "react-router-dom";

export default function Logout(props) {
    useEffect(() => {
        localStorage.removeItem("token");
        props.handleLogout();
    })
    return <Redirect to="/sign-in" />
}