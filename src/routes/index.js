import React from 'react';
import { BrowserRouter as Router, Switch} from "react-router-dom";

import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import HomePage from '../pages/HomePage';
import Signin from '../pages/Signin';
import MyRoute from './MyRoute';
import ProfilePage from '../pages/ProfilePage';
import PatientPage from '../pages/patientPage';

export default function Routes() {
    return(
        <Router>
            <Switch>
            <MyRoute path="/login" component={Login} notForLogged/>
            <MyRoute path="/home" component={HomePage}/>
            <MyRoute path="/signin" component={Signin} notForLogged/>
            <MyRoute path="/profile-page" component={ProfilePage} isClosed/>
            <MyRoute path="/patient-page" component={PatientPage} isClosed/>
            <MyRoute path="*" component={Page404}/>
            </Switch>
        </Router>
    )
}