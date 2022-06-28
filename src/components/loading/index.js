import React from "react";
import propTypes from 'prop-types'
import { Container } from "react-bootstrap";

export default function Loading( { isLoading }) {
    if(!isLoading) return <></>;
    return(
        <Container>
            <div/>
            <span>Carregando...</span>
        </Container>
    )
}

Loading.defaultProps = {
    isLoading: false,
};

Loading.propTypes = {
    isLoading: propTypes.bool
}