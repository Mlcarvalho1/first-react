import React, { useEffect, useState } from "react";
  
import { Container, Text, Title, PatientCard, MeasurementsCard, MeasurementsTable } from "./styled";
import axios from "../../services/axios";

export default function PatientPage() {
    const [patient, getPatient] = useState({})
    const [measurements, setMeasurements] = useState([])
    
    const showPatient = async() => {
        await axios.get(`/patients/`);
    }

    // const listMeasurements = async () => {
    //     const measurementsResp = await axios.get(`/patients/measurements/${patient.id}`);
    //     setMeasurements(measurementsResp);
    // }

    useEffect(() => {
        // listMeasurements()
        showPatient()
    }, [])
    return (
        <Container>
                <PatientCard>
                    <Title>Patient Name</Title>
                    <Text>
                        Peso: <br/>
                        Altura: <br/>
                        Idade: <br/>
                        Média glicemica: <br/>
                        Hemoglobina glicada: <br/>
                    </Text>
                </PatientCard>
                <MeasurementsCard>
                    <MeasurementsTable hover>
                    <thead>
                        <tr>
                            <th>Horário</th>
                            <th>Glicemia</th>
                            <th>Carboidratos consumidos</th>
                            <th>Insulina aplicada</th>
                            <th></th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                        </tbody>
                    </MeasurementsTable>
                </MeasurementsCard>
        </Container>
    )
}