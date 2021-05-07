import React from "react";
import Routes from "./routes";
import {useAuth} from "./auth";

export default function AuthRoutes() {
    const auth = useAuth();
    return (<Routes auth={auth}/>);
}
