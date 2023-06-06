import React from "react";
import { Lin, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePasswordChange = (e) => {setPassword(e.target.value)};

    const handleSubmit (e) => {
        e.preventDefault();

        auth.authorizer({email, password})
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