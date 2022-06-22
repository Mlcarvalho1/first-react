import React from "react";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import  PropTypes  from "prop-types"
import Swal from "sweetalert2";

export default function MyRoute({ component: Component, isClosed, ...rest}){
    const isLoggedIn = false;

    if(isClosed && !isLoggedIn){
        Swal.fire({
            title: 'Erro!',
            text: 'Voce precisa estar logado para acessar esta pagina!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        return(
            <Redirect
                to={{ pathname: '/login', state: { prevPath: rest.location.pathname} }}
            />
        )
    }

    return <Route {...rest} component={Component} />
}

MyRoute.defaultProps = {
    isClosed: false,
}

MyRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    isClosed: PropTypes.bool
}