import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { strToNum } from '../../helpers/index.js';

import { ajaxSaveAdminProductOption } from '../../services/adminService';
import ProductOptionCodeAutocomplete from '../../components/ProductOptionCodeAutocomplete';


export default function ProductOptionDialog({ onHide, productId, show, dialogTitle, dialogText, dialogNoText, data }) {
    const dialogButtonStyle = {
        padding: '4px 30px',
    }

    const initialValues = { type: 'boolean', title: '', price: 0, option_code_id: '', max_quantity: 0, fixed_value: 0 }

    const [fields, setFields] = useState(() => {
        return data ?
            { type: data['type'], title: data['title'], price: data['price'], option_code_id: data['option_code_id'], max_quantity: data['max_quantity'], fixed_value: data['fixed_value'] } :
            { ...initialValues }
    });

    const [errors, setErrors] = useState(false);

    const handleOptionTypeChange = (event, value) => {
        if (value) {
            setFields({ ...fields, type: value.value });    
        }
    };


    const handleFieldChange = event => {
        const value = event.target.value;

        switch (event.target.id) {
            case 'title':
                setFields({ ...fields, title: value });
                break;
            case 'price':
                setFields({ ...fields, price: strToNum(value) });
                break;
            case 'maxqty':
                setFields({ ...fields, max_quantity: strToNum(value) });
                break;
            case 'fixed_value':
                setFields({ ...fields, fixed_value: strToNum(value) });
                break;
            default:
                break;
        }
    }

    const handleOnChangeOptionCode = (event, value) => {
        let optionCodeId = value ? value.id : '';
        let optionTitle = value ? value.label : fields['title'];
        setFields({ ...fields, option_code_id: optionCodeId, title: optionTitle });
    }

    const getError = (fieldId) => {
        return errors && errors[fieldId];
    }

    const isError = (fieldId) => {
        if (errors && errors[fieldId]) {
            return true;
        } else return false;
    }

    const handleSave = () => {

        let hasError = false, newErrors = {};

        if (!fields['title']) {
            newErrors['title'] = 'Required';
            hasError = true;
        }

        if (!fields['price']) {
            newErrors['price'] = 'Required';
            hasError = true;
        }

        if (!fields['option_code_id']) {
            newErrors['option_code_id'] = 'Required';
            hasError = true;
        }

        if (fields['type'] === 'integer' && fields['max_quantity'] <= 0) {
            newErrors['max_quantity'] = 'Only positive numbers';
            hasError = true;
        }

        if (fields['type'] === 'fixed') {
            if (!fields['fixed_value']) {
                newErrors['fixed_value'] = 'Yuu have to input the fixed value';
                hasError = true;
            }
            else if (fields['fixed_value'] <= 0) {
                newErrors['fixed_value'] = 'Only positive numbers';
                hasError = true;
            }
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        let params = {
            product_code_id: productId,
            title: fields['title'],
            max_quantity: fields['max_quantity'],
            price: fields['price'],
            type: fields['type'],
            option_code_id: fields['option_code_id'],
            fixed_value: fields['fixed_value'],
        }

        if (data && data.id) {
            params.id = data.id;
        }

        ajaxSaveAdminProductOption(params)
            .then(res => {
                // const { data, } = res;
                onHideHandler({ button: 'save' });
            }).catch(() => {

            });
    }

    const onHideHandler = (params) => {
        setErrors(false);
        onHide(params);
    }

    const optionTypes = [
        { label: 'Binary choice', value: 'boolean' },
        { label: 'Manual input', value: 'integer' },
        { label: 'Binary choice + fixed value', value: 'fixed' },
    ];


    return (

        <Dialog fullWidth PaperProps={{ style: { opacity: 0.8, backgroundColor: "white", color: "black", } }} onClose={() => onHideHandler({ button: 'cancel' })} open={show}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText color="inherit">
                    {dialogText}
                </DialogContentText>

                <ProductOptionCodeAutocomplete
                    error={isError('option_code_id') }
                    helperText={getError('option_code_id')}
                    id="option_code_id"
                    onChange={handleOnChangeOptionCode}  
                    value={fields['option_code_id']}
                />

                <TextField
                    error={isError('title')}
                    helperText={getError('title')}
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    value={fields['title']}
                    onChange={handleFieldChange}
                    fullWidth
                    variant="standard"
                />

                <TextField
                    error={isError('price')}
                    helperText={getError('price')}
                    margin="dense"
                    id="price"
                    label="MSRP ($ USD)"
                    type="number"
                    value={fields['price']}
                    onChange={handleFieldChange}
                    fullWidth
                    variant="standard"
                />

                {fields['type'] === "integer" ?
                    <TextField
                        error={isError('max_quantity')}
                        helperText={getError('max_quantity')}
                        margin="dense"
                        id="maxqty"
                        label="Max Qty"
                        type="number"
                        onChange={handleFieldChange}
                        value={fields['max_quantity']}
                        fullWidth
                        variant="standard"
                    />
                    : ''}
                
                {fields['type'] === "fixed" ?
                    <TextField
                        error={isError('fixed_value')}
                        helperText={getError('fixed_value')}
                        margin="dense"
                        id="fixed_value"
                        label="Fixed value"
                        type="number"
                        onChange={handleFieldChange}
                        value={fields['fixed_value']}
                        fullWidth
                        variant="standard"
                    />
                    : ''}

                <Autocomplete
                    disablePortal
                    options={optionTypes}
                    sx={{ width: 300 }}
                    id="combo-option-type"
                    value={optionTypes.find((item) => (item.value === fields['type']))}
                    onChange={handleOptionTypeChange}
                    renderInput={(params) => <TextField {...params} label="Option type" variant="standard" />}

                />
                
            </DialogContent>
            <DialogActions style={{ flex: "space-around", }}>
                <Button onClick={() => onHideHandler({ button: 'cancel' })} style={dialogButtonStyle} variant="contained">{dialogNoText}</Button>
                <Button onClick={handleSave} style={dialogButtonStyle} variant="contained">Save</Button>
            </DialogActions>

        </Dialog>

    );
}