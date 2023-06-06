import React from "react";
import { Lin, useNavigate } from 'react-router-dom';
import { auth } from "../utils/Auth";

function Register () {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [errorMessage, setErrorMessage] = React.useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePasswordChange = (e) => {setPassword(e.target.value)};
    //передать эти функции в инпуты

    const handleSubmit (e) => {
        e.preventDefault();
        // if (!email || !password) {
        //     setErrorMessage('Write atleast something there')    
        // }

        auth.register({email, password})
            .then((userData) => {
                setTooltipOpen(true);
                setStatus(true)
            })
            .catch((err) => {
                setTooltipOpen(true);
                setStatus(false)
            })
    }
}