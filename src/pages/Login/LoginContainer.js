import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


import Login from './Login';

import * as actions from "../../store/modules/auth.js/actions" 

export default function LoginContainer(props) {
    const history = useHistory();
    const dispatch = useDispatch();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErros = false;

        if(!isEmail(email)){
            formErros = true;
            toast.error('email inválido');
        }
        
        if(password.length < 6 || password.length > 50){
            formErros = true;
            toast.error('senha inválida');
        }

        if(formErros) return;
        dispatch(actions.loginRequest({email, password}))
        history.push('/profile-page');
    };
    
    return <Login
      email={email}
      password={password}
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
    />
}