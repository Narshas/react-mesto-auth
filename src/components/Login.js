import React from "react";
//import { Link, useNavigate } from 'react-router-dom';

export function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    //const navigate = useNavigate();

    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePasswordChange = (e) => {setPassword(e.target.value)};

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleLogin(password, email);
        setPassword('');
        setEmail('');
    }

    return (
        <>
        </>
    )
}