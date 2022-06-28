import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";

import { ModalForm } from "./styled";
import axios from "../../services/axios";
import Swal from "sweetalert2";

export default function PatientCreateModal({setOpenModal, listPatients}) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [borned_at, setBornedAt] = useState('');
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
    }

    return(
        <Modal show >
            <Modal.Header closeButton  onClick={handleClose}>
            <Modal.Title>Cadastrar Paciente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalForm >
                    <ModalForm.Group className="mb-3">
                        <ModalForm.Label>Nome:</ModalForm.Label>
                        <ModalForm.Control type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </ModalForm.Group>
                    <ModalForm.Group className="mb-3">
                        <ModalForm.Label>Peso:</ModalForm.Label>
                        <ModalForm.Control type="number" value={weight}  onChange={e => setWeight(e.target.value)}/>
                    </ModalForm.Group>
                    <ModalForm.Group className="mb-3">
                        <ModalForm.Label>Altura:</ModalForm.Label>
                        <ModalForm.Control type="number" value={height}  onChange={e => setHeight(e.target.value)}/>
                    </ModalForm.Group>
                    <ModalForm.Group className="mb-3">
                        <ModalForm.Label>Data de nascimento:</ModalForm.Label>
                        <ModalForm.Control type="date" value={borned_at} max={moment().format()} onChange={e => setBornedAt(e.target.value)}/>
                    </ModalForm.Group>
                </ModalForm>
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
    )
}