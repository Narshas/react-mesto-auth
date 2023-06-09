import React from "react";
import { useNavigate } from 'react-router-dom';

function infoTooltip (props) {
    
    const navigate = useNavigate()

    const closeTooltip = () => {
        if(props.isError) {
            props.onClose()
        }
        props.onClose();
        navigate('/login', {replace: true}); 
    }

    return (
        <div className={`${props.isOpen? 'popup_active' : ''} popup`}>
             <div className="popup__container">
                <button className="popup__close" aria-label="закрыть попап" onClick={closeTooltip}/>
                <div className="authorize__response">
                    <img src={!props.isError? : }
                    className={ !props.isError? 'authorize__noerr-logo' : 'authorize__err-logo'}/>
                    <p className="authorize__info">{!props.isError
                    ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                </div>
             </div>
        </div>
    )
}