import React, { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { Dropdown } from "react-bootstrap";

import { Container, Text, Title, PatientCard, MeasurementsCard, MeasurementsTable, Button, InputDate } from "./styled";
import PatientEditModal from "../../components/PatientEditModal";
import MeasurementCreateModal from "../../components/CreateMeasurementModal";
import MeasurementEditModal from "../../components/MeasurementEditModal";
import axios from "../../services/axios";

export default function PatientPage({match}) {
    const [patient, setPatient] = useState({})
    const [measurements, setMeasurements] = useState([])
    const [measurement, setMeasurement] = useState({});
    const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
    const [openPatientEditModal, setOpenPatientEditModal] = useState(false);
    const [openMeasurementCreateModal, setOpenMeasurementCreateModal] = useState(false);
    const [openMeasurementEditModal, setOpenMeasurementEditModal] = useState(false);
    
    const editPatient = () => setOpenPatientEditModal(true)

    const showPatient = async () => {
        const patientResp = await axios.get(`/patients/${match.params.id}`);
        setPatient(patientResp.data)
    }
    
    const measurementEdit = (measurement) => {
        console.log('aaaaa');
        setMeasurement(measurement)
        setOpenMeasurementEditModal(true)
    }

    const deleteMeasurement = (e, measurement, index) => {
        e.persist()
        Swal.fire({
           title: 'Você tem certeza?',
           text: "Você irá apagar permanentemente esta medição",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Sim, quero deletar!'
         }).then(async(result) => {
           if (result.isConfirmed) {
             try {
                   await axios.delete(`/patients/measurements/${patient.id}/${measurement.id}`);
                   const newMeasurements = [...measurements];
                   newMeasurements.splice(index, 1);
                   setMeasurements(newMeasurements)
                   Swal.fire(
                       'Deletado!',
                       'Medição deletada com sucesso',
                       'success'
                   )
               } catch (e) {
                   Swal.fire(
                       'Oops...',
                       'Não foi possível deletar esta medição',
                       'error'
                   )   
           
               }
           }
         })
    }
    
    const createMeasurement = () => setOpenMeasurementCreateModal(true)

    const listMeasurements = async () => {
        const measurementsResp = await axios.get(`/patients/measurements/${match.params.id}`, {params: {
            day,
            page: 1
        }});
        const formatedMeasurements = measurementsResp.data.items.map(measurement => { 
            measurement.measurement_date = moment(measurement.measurement_date).format('LT')
            return measurement
        })
        setMeasurements(formatedMeasurements)
    }

    useEffect(() => {
        showPatient()
        listMeasurements()
    }, [day]);

    return (
        <>
        {openPatientEditModal && <PatientEditModal patient={patient} setOpenModal={setOpenPatientEditModal} listPatients={showPatient}/>}
        {openMeasurementCreateModal && <MeasurementCreateModal patientId={patient.id} setOpenModal={setOpenMeasurementCreateModal} listMeasurements={listMeasurements}></MeasurementCreateModal>}
        {openMeasurementEditModal && <MeasurementEditModal setOpenModal={setOpenMeasurementEditModal} measurement={measurement} patientId={patient.id} listMeasurements={listMeasurements}></MeasurementEditModal>}
        <Container>
                <PatientCard>  
                    <div className="mb-2"> 
                        <Title>{patient.name}</Title>
                        <Button variant="secondary" onClick={editPatient}>Editar</Button>
                    </div>
                    <Text>
                        Peso: {patient.weight} Kg<br/>
                        Altura: {patient.height} cm<br/>
                        Idade: {moment().diff(patient.borned_at,'years')} anos<br/>
                        Média glicemica: {patient.glycemic_average} mg/dl<br/>
                        Hemoglobina glicada: {patient.glycated_hemoglobin}%<br/>
                    </Text>
                </PatientCard>
                <MeasurementsCard>
                    <div className="mb-2"> 
                        <Title>Medições</Title>
                        <Button variant="secondary" onClick={createMeasurement}> Adicionar medição</Button>
                    </div>  
                    <InputDate type="date" value={day} onChange={e => setDay(e.target.value)}></InputDate>
                    <MeasurementsTable hover>
                    <thead>
                        <tr>
                            <th>Horário</th>
                            <th>Glicemia</th>
                            <th>Carboidratos consumidos</th>
                            <th>Insulina aplicada</th>
                        </tr>
                    </thead>
                        <tbody>
                            {measurements.map((measurement, index) => (
                                <tr key={measurement.id}>
                                    <td>{measurement.measurement_date}</td>
                                    <td>{measurement.glucose} mg/dl</td>
                                    <td>{measurement.carbs} g</td>
                                    <td>{measurement.insulin} u</td>
                                    <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => measurementEdit(measurement)}>Editar</Dropdown.Item>
                                            <Dropdown.Item onClick={e => deleteMeasurement(e, measurement, index)}>Deletar</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                </tr>
                                )
                            )}
                        </tbody>
                    </MeasurementsTable>
                </MeasurementsCard>
        </Container>
        </>
    )
}