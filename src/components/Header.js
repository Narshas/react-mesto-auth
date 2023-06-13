import React from 'react';
import logoWhite from "../images/logo-white.svg";
import {Route, Link} from 'react-router-dom';

export function Header(props) {
    return (
        <header className='header'>
            <img src={logoWhite} alt="Логотип сервиса Место" className='header__logo' />
            
            <div className='header__user-bar'>
                { props.loggedIn
                ? (
                    <>
                        <p className='header__item'>{props.email}</p>
                        <Link onClick={props.handleLogout} className='header__item' to='/sign-in'>Выйти</Link>
                    </>
                )
                : (
                    <>
                        <Route path='/sign-in'>
                            <Link className='header__item' to='/sign-up'>Вход</Link>
                        </Route>
                        <Route path='/sign-up'>
                            <Link className='header__item' to='/sign-in'>Регистрация</Link>
                        </Route>
                    </>
                )
                }
            </div>
        </header>
    )
}