import styled from "styled-components";
import { Card, Table, Button as button, Pagination, ButtonGroup, Alert as alert } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";

export const Container = styled.div`
    display: flex;
    align-items: center;
`

export const PatientCard = styled(Card)`
    float: left;
    padding: 1em;
`

export const Alert = styled(alert)`
    margin-top: 10px;
    text-align: center;
`

export const MeasurementsCard = styled(Card)`
    padding: 10px 10px 0px 10px;
    overflow-x: scroll;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const MeasurementsPagination = styled(Pagination)`
    margin-left: auto;
    margin-right: auto;
    z-index: 0;
`

export const ChartSelector = styled(ButtonGroup)`
    margin-left: 10vw;
`

export const ChartCard = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    border-radius: 8px;
    background-color: white;
    padding: 1em;
`

export const Chart = styled(HighchartsReact)`

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
    margin-left: 5px;
`
export const SelectDayContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: 310px;
`
