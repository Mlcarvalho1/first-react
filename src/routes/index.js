import React from 'react';
import { BrowserRouter as Router, Switch} from "react-router-dom";

import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import HomePage from '../pages/HomePage';
import Signin from '../pages/Signin';
import MyRoute from './MyRoute';

export default function Routes() {
    return(
        <Router>
            <Switch>
            <MyRoute path="/login" component={Login}/>
            <MyRoute path="/home" component={HomePage}/>
            <MyRoute path="/signin" component={Signin}/>
            <MyRoute path="*" component={Page404}/>
            </Switch>
        </Router>
    )
}