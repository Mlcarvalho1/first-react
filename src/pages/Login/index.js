import React from "react";
import { useDispatch } from "react-redux";
import { FormContainer, SigninBtn} from "./styled";
import { Form, Button } from "react-bootstrap";
import * as exampleActions from "../../store/modules/auth.js/actions" 


export default function Login() {
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(exampleActions.sendForm())
    }
    
    return (
    <>
    <h1>Login</h1>
    <FormContainer>
        <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button className="mx-auto d-block" variant="primary" type="submit" onClick={handleClick}>
                Acessar
            </Button>
        </Form>
    </FormContainer>
    <SigninBtn className="mx-auto d-block" href="/signin" variant="secondary">Ainda nao possui cadastro?</SigninBtn>
    </>
    )
}