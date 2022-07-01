import React from "react";
import propTypes from 'prop-types'

import loading from './amigo-loading-v3.gif'
import { Container, LoadingGiff, LoadingSpan, LoadingText } from "./styled";

export default function Loading( { isLoading }) {
    if(!isLoading) return <></>;
    return(
        <Container>
            <div/>
            <LoadingSpan>
                <LoadingGiff src={loading} alt=""/>
                <LoadingText>Carregando...</LoadingText>
            </LoadingSpan>
        </Container>
    )
};

Loading.defaultProps = {
    isLoading: false,
};

Loading.propTypes = {
    isLoading: propTypes.bool
};