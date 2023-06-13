import React from "react";
import { Link} from 'react-router-dom';

export function Register (props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    //const [errorMessage, setErrorMessage] = React.useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleRegister(password, email);
        setPassword('');
        setEmail('');
    }

    return (
        <div className="authorize">
            <h3 className="authorize__title">Регистрация</h3>
            <form className="authorize__form" onSubmit={handleSubmit}>
                <label className="authorize__label" htmlFor="email"> </label>
                <input className="authorize__input" onChange={handleEmailChange}
                id="email" type="email" name="email" required value={email || ''}/>
                <span className="authorize__input-error"/>
                <label className="authorize__label" htmlFor="password"></label>
                <input className="authorize__input" onChange={handlePasswordChange}
                id="password" type="password" name="password" required 
                value={password || ''}/>
                <span className="authorize__input-error"/>
                <button className="authorize__submit" type="submit" aria-label="Зарегистрироваться">
                    Зарегистрироваться
                </button>
            </form>
    
            <div className="authorize__side-block">
                <Link className="authorize__side-link" to="sign-in"> Уже зарегистрированы? Войти </Link>
            </div>
        </div>
    )
}