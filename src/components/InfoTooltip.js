import React from "react";
import { useHistory } from 'react-router-dom';

function infoTooltip (props) {
    const history = useHistory;

    const closeRegisterPopup = () => {
        if(props.loggedIn) {
            props.onClose()
        } 
        if () {

        }
    }

    return (
        <>
        </>
    )
}