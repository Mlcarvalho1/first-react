import styled from "styled-components";
import { Card, Table } from "react-bootstrap";

export const Container = styled.div`
    display: flex;
    align-items: center;
`

export const PatientCard = styled(Card)`
    float: left;
    padding: 10px;
    max-width: 18em;
`

export const MeasurementsCard = styled(Card)`
    padding: 10px;
    overflow-x: scroll;
`

export const MeasurementsTable = styled(Table)`
`

export const Title = styled.h1`
    text-align: left;
    color: black;
`

export const Text = styled.p`
    color: black;
`

