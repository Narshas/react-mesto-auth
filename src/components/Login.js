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
        <div>
            <h3></h3>
            <form>
                <label className="popup__label"></label>
                <input/>
                <span/>
                <label className="popup__label"></label>
                <input/>
                <span/>
                <button></button>
            </form>
    
            <div>
                <p></p>
                <Link/>
            </div>
        </div>
    )
}