import React from "react";
import Signup from "./signup";
import {useAuth} from "../../app/auth";
import {Redirect} from "react-router-dom";

export default function AuthSignup() {
    const auth = useAuth();
    const component = auth.user ? (
        <Redirect from="/public/signup" to='/'/>
    ) : (
        <Signup auth={auth}/>
    );
    return component;
}
