import React from 'react';
import Alert from '@mui/material/Alert';

export default function useAlert(defaultValue, severity) {
    const [alert, setAlert] = React.useState(defaultValue);

    function showAlert() {

        return (
            alert ? <Alert severity={severity}>{alert}</Alert > : ''
        );
    }

    const resetAlert = () => {
        setAlert(defaultValue);
    }

    return { alert, setAlert, showAlert, resetAlert };
}