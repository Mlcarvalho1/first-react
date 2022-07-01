import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";

import Loading from "../loading";
import { ModalForm } from "./styled";
import axios from "../../services/axios";

export default function UserEditModal({setOpenModal, user, showUser}) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isLoading, setIsLoading] = useState(false);
    const [formChanged, setFormChanged] = useState(false)

    const handleClose = () => setOpenModal(false);
    const handleSubmit = async() => {
        let formErros = false

        if (name.length < 3 || name.length > 100 ){
            toast.error('Nome inválido');
            formErros = true;
        }

        if(!isEmail(email)){
            toast.error('Email inválido');
            formErros = true;
        }

        if (formErros || !formChanged) return;

        setIsLoading(true);
        try {
            await axios.put('/users', {name, email});
            Swal.fire({
                icon: 'success',
                title: 'Dados atualizados com sucesso',
            });
            await showUser()
            setIsLoading(false);
            setOpenModal(false);
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
        <Modal show >
            <Loading isLoading={isLoading}/>
            <Modal.Header closeButton  onClick={handleClose}>
            <Modal.Title>Editar Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalForm >
                    <ModalForm.Group className="mb-3">
                        <ModalForm.Label>Nome</ModalForm.Label>
                        <ModalForm.Control type="text" value={name} onChange={e => {setName(e.target.value); setFormChanged(true)}}/>
                    </ModalForm.Group>

                    <ModalForm.Group className="mb-3">
                        <ModalForm.Label>Email</ModalForm.Label>
                        <ModalForm.Control type="email" value={email} onChange={e => {setEmail(e.target.value); setFormChanged(true)}}/>
                    </ModalForm.Group>
                </ModalForm>
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