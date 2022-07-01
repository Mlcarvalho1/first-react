import styled from "styled-components";

import { Button as button } from "react-bootstrap";

export const Container = styled.div`
    padding: 10px;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    height: 90vh;
`

export const Title = styled.h1`
    color: white;
`

export const Button = styled(button)`
`

export const Link = styled.a`
    color: white;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        color: white
    }
`

export const Text = styled.p`
    color: white;
`
