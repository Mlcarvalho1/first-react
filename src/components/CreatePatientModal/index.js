import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { InputGroup, Form } from "react-bootstrap";

import Loading from "../loading";
import axios from "../../services/axios";
import Swal from "sweetalert2";

export default function PatientCreateModal({setOpenModal, listPatients}) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [borned_at, setBornedAt] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => setOpenModal(false)


    const handleSubmit = async () => {
        let formErrors = false
        
        if(height < 20 || height > 250){
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
       
        setIsLoading(true)

        try {
            await axios.post('/patients', {
                name,
                height,
                weight,
                borned_at
            })
    
            Swal.fire({
                icon: 'success',
                title: 'Paciente cadastrado com sucesso!'
            })
            setOpenModal(false);
            listPatients();
            setIsLoading(false);
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo deu errado',
                    text: e.response.data.error
                });
            } finally {
                setIsLoading(false);
            }
    }

    return(
        <>
        <Modal show >
            <Loading isLoading={isLoading}/>
            <Modal.Header closeButton  onClick={handleClose}>
            <Modal.Title>Cadastrar Paciente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                        <Form.Label>Nome:</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </InputGroup>
                        <Form.Label>Peso:</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" value={weight}  onChange={e => setWeight(e.target.value)}/>
                        <InputGroup.Text id="basic-addon2">Kg</InputGroup.Text>
                    </InputGroup>
                        <Form.Label>Altura:</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" value={height}  onChange={e => setHeight(e.target.value)}/>
                        <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
                    </InputGroup>
                        <Form.Label>Data de nascimento:</Form.Label>
                    <InputGroup>
                        <Form.Control type="date" value={borned_at} max={moment().format()} onChange={e => setBornedAt(e.target.value)}/>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Cadastrar
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}