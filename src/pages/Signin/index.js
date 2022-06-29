import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Form, Button, Container} from "react-bootstrap";
import isEmail from "validator/lib/isEmail";
import { get } from "lodash";

import axios from "../../services/axios";

export default function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [PasswordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        let formErros = false;
        if(name.length < 3 || name.length > 100){
            formErros = true
        
            toast.error('Seu nome deve ter entre 3 e 255 caracteres')
        }

        if(password.length < 6 || password.length > 80){
            formErros = true

            toast.error('Sua senha deve ter entre 6 e 80 caracteres')
        }

        if(!isEmail(email)){
            formErros = true

            toast.error('Email Inválido')
        }

        if(password !== PasswordConfirmation){
            formErros = true

            toast.error('a senha e a confirmação precisam ser iguais')
        }

        if(formErros){
            return
        }
        
        try{
            await axios.post('/users', {
                name,
                email,
                password,
                password_confirmation: PasswordConfirmation
            });

            await Swal.fire({
                icon: 'success',
                title: 'Usuário cadastrado',
              })

            props.history.push('/login')
              
        }catch(e){
            const status = get(e, 'response.data.error')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: status,
              })
        }

    }

    return (
    <>
    <h1> Cadastro </h1>
    <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Seu nome" value={name} onChange ={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Seu email" value={email} onChange ={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Sua senha" value={password} onChange ={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirmar Senha</Form.Label>
                <Form.Control type="password" placeholder="Confirmacao" value={PasswordConfirmation} onChange ={e => setPasswordConfirmation(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Container>
    </>
    )
}