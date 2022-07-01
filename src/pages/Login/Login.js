import * as StyledLogin from "./Login.styles";

export default function Login({ setEmail, setPassword, email, password, handleSubmit }) {
  return (
    <>
    <StyledLogin.PageTitle>Login</StyledLogin.PageTitle>
    <StyledLogin.FormContainer>
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
    </StyledLogin.FormContainer>
    <StyledLogin.SigninBtn className="mx-auto d-block" href="/signin" variant="secondary">Ainda nao possui cadastro?</StyledLogin.SigninBtn>
    </>
  )
};