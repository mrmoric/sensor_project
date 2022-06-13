import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { strToNum } from '../../helpers/index.js';
import { ajaxRecievePayment } from '../../services/paymentService';
import validator from 'validator';

export default function RecievePaymentDialog({ onHide, companyId, show, dialogTitle, dialogText, dialogNoText }) {

    const dialogButtonStyle = {
        padding: '4px 30px',
    }

    const initialFieldsValues = { amount: 0, }
    const [fields, setFields] = useState({ ...initialFieldsValues });
    const [errors, setErrors] = useState(false);

    const onHideHandler = (params) => {
        setErrors(false);
        setFields({ ...initialFieldsValues });
        onHide(params);
    }

    const handleFieldChange = event => {
        const value = event.target.value;

        switch (event.target.id) {
            case 'amount':
                setFields({ ...fields, amount: strToNum(value) });
                break;
            default:
                break;
        }
    }

    const getError = (fieldId) => {
        return errors && errors[fieldId];
    }

    const checkError = (fieldId) => {
        return (errors && errors[fieldId]) ? true : false;
    }

    const validateFields = () => {

        let hasError = false, newErrors = {};

        let key = 'amount';
        let fieldValue = fields[key] ? fields[key] + '' : '';

        if (validator.isEmpty(fieldValue, { 'ignore_whitespace': true })) {

            newErrors[key] = 'required field';
            hasError = true;

        }

        if (hasError) {
            setErrors(newErrors);
        }

        return !hasError;

    }

    const handleSave = () => {

        if (validateFields()) {

            let params = {
                companyId: companyId,
                amount: fields['amount'],
            }

            ajaxRecievePayment(params)
                .then(res => {
                    onHideHandler({ button: 'save' });
                }).catch((e) => {
                    setErrors({ 'apiError': e.message });
                });

        }

    }


    return (

        <Dialog fullWidth PaperProps={{ style: { opacity: 0.8, backgroundColor: "white", color: "black", } }} onClose={() => onHideHandler({ button: 'cancel' })} open={show}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText color="inherit">
                    {dialogText}
                </DialogContentText>

                <TextField
                    error={checkError('amount')}
                    helperText={getError('amount')}
                    margin="dense"
                    id="amount"
                    label="Amount"
                    type="number"
                    onChange={handleFieldChange}
                    value={fields['amount']}
                    fullWidth
                    variant="standard"
                />

                {errors && errors['apiError'] && <Alert severity="error">{errors['apiError']}</Alert >}

            </DialogContent>
            <DialogActions style={{ flex: "space-around", }}>
                <Button onClick={() => onHideHandler({ button: 'cancel' })} style={dialogButtonStyle} variant="contained">{dialogNoText}</Button>
                <Button onClick={handleSave} style={dialogButtonStyle} variant="contained">Save</Button>
            </DialogActions>

        </Dialog>

    );
}