import styled from "styled-components";
import { Card, Table, Button as button, InputGroup } from "react-bootstrap";

export const Container = styled.div`
    display: flex;
    align-items: center;
`

export const PatientCard = styled(Card)`
    float: left;
    padding: 1em;
`

export const MeasurementsCard = styled(Card)`
    padding: 10px;
    overflow-x: scroll;
`

export const MeasurementsTable = styled(Table)`
    text-align: center;
`

export const Title = styled.h1`
    float: left;
    text-align: left;
    color: black;
`

export const Text = styled.p`
    font-size: large;
    color: black;
`

export const Button = styled(button)`
`

export const InputDate = styled.input`
    border-radius: 3px;
    padding: 5px;
    align-self: center;
    max-width: 150px;
`



