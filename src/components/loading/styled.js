import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;

    div{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: rgba(0,0,0,0.7);
    }
`

export const LoadingGiff = styled.img`
    width: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: auto;
    z-index: 2;
`

export const LoadingText = styled.p`
    z-index: 2;
`

export const LoadingSpan = styled.span`
    border-radius: 8px;
    padding: 10px;
    z-index: 2;
`