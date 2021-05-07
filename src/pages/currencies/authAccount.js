import React from 'react';
import Account from "./account";
import {useAuth} from "../../app/auth";

export default function AuthAccount() {
    let auth = useAuth();

    return <Account auth={auth}/>;
}
