import React from "react";
import { useNavigate } from 'react-router-dom';

function infoTooltip (props) {
    
    const navigate = useNavigate()

    const closeRegisterPopup = () => {
        if(props.isError) {
            props.onClose()
        }
        navigate('/login', {replace: true}); 
        props.onClose();
    }

    return (
        <>
        </>
    )
}