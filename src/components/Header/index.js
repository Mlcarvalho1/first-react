import React from "react";
import { Navbar,Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/modules/auth.js/actions"

export default function Header(){
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const handleLogout = () => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você está prestes a deslogar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero deslogar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deslogado com sucesso!',
                'success'
              )
              dispatch(actions.loginFailure())
              return <Redirect to="/home"/>
            }
          }) 
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                {!isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}
                {isLoggedIn && <Nav.Link href="/profilePage">Meu perfil</Nav.Link>}
                {isLoggedIn && <Nav.Link onClick={handleLogout}>Sair da conta</Nav.Link>}
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}