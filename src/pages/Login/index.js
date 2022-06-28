import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


import { FormContainer, SigninBtn} from "./styled";
import * as actions from "../../store/modules/auth.js/actions" 

export default function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch()


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErros = false;

        if(!isEmail(email)){
            formErros = true;

            toast.error('email inválido')
        }
        
        if(password.length < 6 || password.length > 50){
            formErros = true;

            toast.error('senha inválida')
        }

        if(formErros) return;

        dispatch(actions.loginRequest({email, password}))

        history.push('/profile-page');
    }
    
    return (
    <>
    <h1>Login</h1>
    <FormContainer>
        <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="mx-auto d-block" variant="primary" type="submit" onClick={handleSubmit}>
                Acessar
            </Button>
        </Form>
    </FormContainer>
    <SigninBtn className="mx-auto d-block" href="/signin" variant="secondary">Ainda nao possui cadastro?</SigninBtn>
    </>
    )
}