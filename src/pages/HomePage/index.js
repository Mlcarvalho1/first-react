import React from "react";
import { useSelector } from "react-redux";
import { Button, Container, Link, Text, Title } from "./styled"
  
export default function HomePage() {
    
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <>       
         
         <Container>
        <Title> API Medições </Title>
            <Text>
            Um site em que você poderá armazenar e analizar suas medições glicemicas
            </Text>
            {!isLoggedIn && <Button><Link href="/login">Acessar Conta</Link></Button>}
            <br/>
            {!isLoggedIn && <Button variant="secondary"><Link href="/signin">Ainda não possui conta?</Link></Button>}
         </Container>
        </>
    )
};