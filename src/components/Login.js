import React from "react";

export function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePasswordChange = (e) => {setPassword(e.target.value)};

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleLogin(password, email);
        setPassword('');
        setEmail('');
    }

    return (
        <div className="authorize">
            <h3 className="authorize__title">Вход</h3>
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
                <button className="authorize__submit" type="submit" aria-label="Войти">
                    Войти
                </button>
            </form>
        </div>
    )
}