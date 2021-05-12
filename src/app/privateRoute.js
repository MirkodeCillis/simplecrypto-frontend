import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "./auth";

export default function PrivateRoute({children, ...rest}) {
    let auth = useAuth();

    return (
        <Route
            {...rest}
            render={({location}) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/public/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}
