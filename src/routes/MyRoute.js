import React from "react";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import  PropTypes  from "prop-types"
import { useSelector } from "react-redux";

export default function MyRoute({ isClosed, notForLogged, ...rest}){
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    if (isClosed && !isLoggedIn){
        return <Redirect to={'/login'}/>

    }

    if (notForLogged && isLoggedIn){
        return <Redirect to={'/profile-page'}/>
    }

    return <Route {...rest} />
}

MyRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    isClosed: PropTypes.bool
} 