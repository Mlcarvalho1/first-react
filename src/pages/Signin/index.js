import React, { useState } from "react";

import { Form, Button, Container } from "react-bootstrap";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [PasswordConfirmation, setPasswordConfirmation] = useState('');
    
    return (
    <>
    <h1> Cadastro </h1>
    <Container>
        <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Inserir email" value={email} onChange ={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Senha" value={password} onChange ={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
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