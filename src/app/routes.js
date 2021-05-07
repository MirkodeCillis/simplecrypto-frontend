import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Home from "../pages/home";
import AuthLogin from "../pages/login/authLogin";
import AuthSignup from "../pages/signup/authSignup";
import PrivateRoute from "./privateRoute";
import PageNotFound from "../pages/pagenotfound";

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.props.auth.setUser(this.props.auth.getUser());
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={AuthLogin}/>
                <Route exact path="/signup" component={AuthSignup}/>
                <Route exact path="/currencies" component={Currencies}/>
                <PrivateRoute exact path="/dashboard">
                    <Dashboard/>
                </PrivateRoute>
                <PrivateRoute path="/community">
                    <Community/>
                </PrivateRoute>
                <Route path='/404' component={PageNotFound}/>
                <Redirect from='*' to='/404'/>
            </Switch>
        );
    }
}
