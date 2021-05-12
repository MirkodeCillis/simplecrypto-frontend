import React from 'react';
import Login from "./login";
import {useAuth} from "../../app/auth";
import {Redirect} from "react-router-dom";

export default function AuthLogin() {
    let auth = useAuth();
    const component = auth.user ? (
        <Redirect from="/public/login" to='/'/>
    ) : (
        <Login auth={auth}/>
    );
    return component;
}
