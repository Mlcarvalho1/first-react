import React, { useEffect, useState } from "react";
import { Table, Dropdown, Card, Button } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import PatientEditModal from "../../components/PatientEditModal";
import PatientCreateModal from "../../components/CreatePatientModal";
import UserEditModal from "../../components/UserEditModal";
import axios from "../../services/axios";
export default function HomePage() {
    const history = useHistory()
    const [patients, setPatients] = useState([]);
    const [user, setUser] = useState({});
    const [patient, setPatient] = useState({});
    const [openPatientEditModal, setOpenPatientEditModal] = useState(false);
    const [openPatientCreateModal, setOpenPatientCreateModal] = useState(false);
    const [openUserEditModal, setOpenUserEditModal] = useState(false);

    const goToPatientPage = patient => {
        history.push(`/patient-page/${patient.id}`)
    }
    const handleUserEdit = () => setOpenUserEditModal(true); 
    const handlePatientEdit = (patient) => {
        setOpenPatientEditModal(true);
        setPatient(patient);
    }
    const handlePatientCreate = () => setOpenPatientCreateModal(true);
    const handlePatientDelete =  (e, id, i) => {
        e.persist()
         Swal.fire({
            title: 'Você tem certeza?',
            text: "Você está prestes a deletar o paciente e suas medições!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero deletar!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              try {
                    await axios.delete(`/patients/${id}`);
                    const newPatients = [...patients];
                    newPatients.splice(i, 1);
                    setPatients(newPatients)
                    Swal.fire(
                        'Deletado!',
                        'Paciente deletado com sucesso',
                        'success'
                    )
                } catch (e) {
                    Swal.fire(
                        'Oops...',
                        'Não foi possível deletar este paciente',
                        'error'
                    )   
            
                }
            }
          })
        

    }

    const listPatients = async () => {
        const patientResp = await axios.get('/patients');
        const formatedPatients = patientResp.data.map(patient => {
            patient.age = moment().diff(patient.borned_at, 'years')
            return patient
        })
        setPatients(formatedPatients);
    }

    const showUser = async () => {
        const userResp = await axios.get('/users');
        setUser(userResp.data);
    }

    useEffect(() => {
        listPatients();
        showUser();
    }, [])
    return (
        <>
        {openPatientEditModal && <PatientEditModal patient={patient} setOpenModal={setOpenPatientEditModal} listPatients={listPatients}/>}
        {openPatientCreateModal && <PatientCreateModal setOpenModal={setOpenPatientCreateModal} listPatients={listPatients}></PatientCreateModal>}
        {openUserEditModal && <UserEditModal setOpenModal={setOpenUserEditModal} user={user} showUser={showUser}></UserEditModal>}
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
                {user.email}
            </Card.Text>
            <Button className="btn btn-secondary" onClick={handleUserEdit}>Editar</Button>
        </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <Card.Title>
                    Pacientes
                    <Button className="btn btn-secondary" onClick={handlePatientCreate}>Cadastrar paciente</Button>
                </Card.Title>
                <Table hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome</th>
                            <th>Peso</th>
                            <th>Altura</th>
                            <th>Idade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, i) => (
                            <tr key={patient.id}>
                                <td onClick={() => goToPatientPage(patient)}>{patient.id}</td>
                                <td onClick={() => goToPatientPage(patient)}>{patient.name}</td>
                                <td onClick={() => goToPatientPage(patient)}>{patient.weight} Kg</td>
                                <td onClick={() => goToPatientPage(patient)}>{patient.height} cm</td>
                                <td onClick={() => goToPatientPage(patient)}>{patient.age} anos</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handlePatientEdit(patient)}>Editar</Dropdown.Item>
                                            <Dropdown.Item onClick={ e => handlePatientDelete(e, patient.id, i)}>Deletar</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
        </>
    )
}