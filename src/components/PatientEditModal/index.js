import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";
import Swal from "sweetalert2";
import { Form, InputGroup } from "react-bootstrap";

import axios from "../../services/axios";

export default function PatientEditModal({setOpenModal, patient, listPatients}) {
    const [name, setName] = useState(patient.name);
    const [weight, setWeight] = useState(patient.weight);
    const [height, setHeight] = useState(patient.height);
    const [borned_at, setBornedAt] = useState(patient.borned_at);
    const [firstError, setFirstError] = useState(true)
    
    const handleClose = () => setOpenModal(false)
    const handleSubmit = async () => {
        
        let formErrors = false

        if(height < 20 || height > 250){
            if(firstError){
                toast.warning('A altura deve ser expressa em centimetros!', {autoClose: false})
                setFirstError(false)
            }
            toast.error('altura inválida')
            formErrors = true
        }
        
        if(name.length < 3 || name.length > 200){
            toast.error('Nome inválido')
            formErrors = true
        }

        if(weight < 5 || weight > 400){
            toast.error('peso inválido')
            formErrors = true
        }

        if(moment(borned_at).isAfter(moment().format()) || !borned_at){
            toast.error('Data de nacimento inválida')
            formErrors = true;
        }

        if(formErrors) return;

        try{
            await axios.put(`/patients/${patient.id}`, {
                name,
                weight,
                height,
                borned_at,
            })
            Swal.fire({
                icon: 'success',
                title: 'Dados atualizados com sucesso',
            });
            listPatients()
            setOpenModal(false);
        }catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Algo deu errado',
                text: e.response.data.error
            });
        }
    }
    return(
        <Modal show >
            <Modal.Header closeButton  onClick={handleClose}>
            <Modal.Title>Editar Paciente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                        <Form.Label>Nome:</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" defaultValue={name} onChange={e => setName(e.target.value)}/>
                    </InputGroup>
                        <Form.Label>Peso:</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" defaultValue={weight} onChange={e => setWeight(e.target.value)}/>
                        <InputGroup.Text id="basic-addon2">Kg</InputGroup.Text>
                    </InputGroup>
                        <Form.Label>Altura:</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" defaultValue={height} onChange={e => setHeight(e.target.value)}/>
                        <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
                    </InputGroup>
                        <Form.Label>Data de nascimento:</Form.Label>
                    <InputGroup>
                        <Form.Control type="date" defaultValue={borned_at} onChange={e => setBornedAt(e.target.value)}/>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Salvar Alterações
            </Button>
            </Modal.Footer>
        </Modal>
    )
}