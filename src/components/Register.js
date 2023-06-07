import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../utils/Auth";

export function Register (props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [errorMessage, setErrorMessage] = React.useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };
    //передать эти функции в инпуты

    const handleSubmit (e) => {
        e.preventDefault();
        props.handleRegister(password, email);
        setPassword('');
        setEmail('');
    }

    return (
        <>
        </>
    )
}