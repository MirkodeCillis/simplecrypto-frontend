import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Home from "../pages/home";
import AuthLogin from "../pages/login/authLogin";
import AuthSignup from "../pages/signup/authSignup";
import PrivateRoute from "./privateRoute";
import PageNotFound from "../pages/pagenotfound";
import Community from "../pages/Community/Community";
import Dashboard from "../pages/Dashboard";
import Currencies from "../pages/Currencies";
import PostNComments from "../pages/Community/PostNComments";

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.props.auth.setUser(this.props.auth.getUser());
    }

    render() {
        return (
            <Switch>
                <Route exact path="/"><Redirect to="/public/"/></Route>
                <Route exact path="/public/" component={Home} />
                <Route exact path="/public/login" component={AuthLogin}/>
                <Route exact path="/public/signup" component={AuthSignup}/>
                <Route exact path="/public/currencies" component={Currencies}/>
                <PrivateRoute exact path="/dashboard/:id">
                    <Dashboard/>
                </PrivateRoute>
                <PrivateRoute exact path="/community">
                    <Community/>
                </PrivateRoute>
                <PrivateRoute exact path="/community/post/:id">
                    <PostNComments/>
                </PrivateRoute>
                <Route exact path='/404' component={PageNotFound}/>
                <Redirect from='*' to='/404'/>
            </Switch>
        );
    }
}
