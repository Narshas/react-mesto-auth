
import React from 'react';
import { Route, Navigate } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext'; // импортируем контекст

export const ProtectedRoute = ({ element: Component, ...props }) => {
    
  //const value = React.useContext(CurrentUserContext); // получаем значения из контекста
  return (

    props.loggedIn ? <Component {...props}/> : <Navigate to="/login" replace/>
    // 
    //<Route path="/" element=(LoggedIn ? <Navigate to='/ducks' /> : <Navigate to='/login' replace />} />

)}