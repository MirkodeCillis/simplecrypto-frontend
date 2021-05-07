import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

import {ProvideAuth} from "./auth";

import NavBar from "../components/navbar";
import AuthRoutes from "./authroutes";

export default function App() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <NavBar/>
                    <AuthRoutes/>
                </div>
            </Router>
        </ProvideAuth>
    );
}
