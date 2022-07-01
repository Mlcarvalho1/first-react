import React, { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { Dropdown, Pagination } from "react-bootstrap";
import Highcharts from 'highcharts';

import Loading from "../../components/loading";
import { Alert, MeasurementsPagination, ChartSelector, Container, ChartCard, Chart, Text, Title, PatientCard, MeasurementsCard, MeasurementsTable, Button, InputDate, SelectDayContainer } from "./styled";
import PatientEditModal from "../../components/PatientEditModal";
import MeasurementCreateModal from "../../components/CreateMeasurementModal";
import MeasurementEditModal from "../../components/MeasurementEditModal";
import axios from "../../services/axios";
import { columnChart, lineChart } from "./chartsConfig";

export default function PatientPage({match}) {
    const [patient, setPatient] = useState({});
    const [measurements, setMeasurements] = useState([]);
    const [measurementsValues, setMeasurementsValues] = useState([]);
    const [measurement, setMeasurement] = useState({});
    const [day, setDay] = useState(moment().format('YYYY-MM-DD'));
    const [openPatientEditModal, setOpenPatientEditModal] = useState(false);
    const [openMeasurementCreateModal, setOpenMeasurementCreateModal] = useState(false);
    const [openMeasurementEditModal, setOpenMeasurementEditModal] = useState(false);
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
    const [pageItens, setPageItens] = useState([]);
    const [atualPage, setAtualPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isColumnChart, setIsColumnChart] = useState(false);
    const [isLineChart, setIsLineChart] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    
    const editPatient = () => setOpenPatientEditModal(true);
    
    const showPatient = async () => {
        const patientResp = await axios.get(`/patients/${match.params.id}`);
        setPatient(patientResp.data);
    };
    
    const measurementEdit = (measurement) => {
        setMeasurement(measurement);
        setOpenMeasurementEditModal(true);
    };
    
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
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                try {
                    await axios.delete(`/patients/measurements/${patient.id}/${measurement.id}`);
                    const newMeasurements = [...measurements];
                    newMeasurements.splice(index, 1);
                    setMeasurements(newMeasurements);
                    Swal.fire(
                        'Deletado!',
                        'Medição deletada com sucesso',
                        'success'
                        );
                    init();
                    if(newMeasurements.length === 0 || newMeasurements.length < 6){
                        setAtualPage(1);
                    }
                } catch (e) {
                    Swal.fire(
                        'Oops...',
                        'Não foi possível deletar esta medição',
                        'error'
                        );   
                        
                }
            }
        });
    };
            
    const createMeasurement = () => setOpenMeasurementCreateModal(true);
    
    const listMeasurements = async () => {
        const measurementsResp = await axios.get(`/patients/measurements/${match.params.id}`, {params: {
            day,
            page: atualPage
        }});

        const formatedMeasurements = measurementsResp.data.items.map(measurement => { 
            measurement.measurement_date = moment(measurement.measurement_date).format('LT')
            return measurement
        });

        setMeasurements(formatedMeasurements);

        if (atualPage === 1) {
            const totalMeasurements = measurementsResp.data.total_items;

            setTotalPages(Math.ceil(totalMeasurements / 6));
        }

        pagination(totalPages);
    };
    
    const getMeasurementsValues = async () => {
        const resp = await axios.get(`patients/measurements/${match.params.id}/chart`, {
            params: {
                startDay: startDate,
                endDay: endDate
            }
        });
    const values = resp.data.map(measurement => [ +moment(measurement.measurement_date).subtract(3, 'hours').format('x'), measurement.glucose]);

    setMeasurementsValues(values);
    };

    const pagination = totalPages => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === atualPage} onClick={() => setAtualPage(number)}>
                {number}
                </Pagination.Item>,
            );
        }

        setPageItens(items);
    };

    const setLineChart = () => {
        setIsLineChart(true);
        setIsColumnChart(false);
    };

    const setColumnChart = () => {
        setIsLineChart(false);
        setIsColumnChart(true);
    };

    const init = async () =>{
        setIsLoading(true);
        await showPatient();
        await listMeasurements();
        await getMeasurementsValues();
        setIsLoading(false);
    };

    useEffect(() => {
        init();
    }, [ day, startDate, endDate, atualPage, totalPages]);
    
    return (
    <>
    <Loading isLoading={isLoading}/>
    {openPatientEditModal && <PatientEditModal patient={patient} setOpenModal={setOpenPatientEditModal} listPatients={showPatient}/>}
    {openMeasurementCreateModal && <MeasurementCreateModal patientId={patient.id} setOpenModal={setOpenMeasurementCreateModal} listMeasurements={init}></MeasurementCreateModal>}
    {openMeasurementEditModal && <MeasurementEditModal setOpenModal={setOpenMeasurementEditModal} measurement={measurement} patientId={patient.id} init={init}></MeasurementEditModal>}
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
                {measurements.length === 0 && <Alert><Alert.Heading>Nenhuma medição registrada nesta data</Alert.Heading></Alert>}
                {measurements.length !== 0 && <MeasurementsTable hover>
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
                </MeasurementsTable>}
                <MeasurementsPagination>{pageItens}</MeasurementsPagination>
            </MeasurementsCard>
    </Container>
    <ChartCard>
        <SelectDayContainer>
            <InputDate type="date" value={startDate} onChange={e => setStartDate(e.target.value)}></InputDate>
            <InputDate type="date" value={endDate} onChange={e => setEndDate(e.target.value)}></InputDate>
        </SelectDayContainer>
        {measurementsValues.length !== 0 && <ChartSelector aria-label="Basic example">
            <Button variant="secondary" onClick={setLineChart}>Medições</Button>
            <Button variant="secondary" onClick={setColumnChart}>Médias</Button>
        </ChartSelector>}
        {isColumnChart && measurementsValues.length !== 0 && <Chart highcharts={Highcharts} options={columnChart(measurementsValues)} />}
        {isLineChart && measurementsValues.length !== 0 && <Chart highcharts={Highcharts} options={lineChart(startDate, endDate ,measurementsValues)}/>}
        {measurementsValues.length === 0 && <Alert><Alert.Heading>Nenhuma medição registrada nesta data</Alert.Heading></Alert>}
    </ChartCard>
    </>
    )
};