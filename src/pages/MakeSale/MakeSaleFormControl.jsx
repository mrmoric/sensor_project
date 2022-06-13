import React from 'react';

import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { styled } from '@mui/material/styles';

export default function MakeSaleFormControl(props) {

    const marginBottom = props.helperText ? '90px' : '3px';

    const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
        [`&.MuiFormControlLabel-root`]: {
            marginLeft: 0,
        },
        [`&.MuiFormControlLabel-root > .MuiTypography-root`]: {
            marginRight: '15px',
            marginBottom: marginBottom,
            fontSize: '20px',
            width: '280px',
            textAlign: 'right',
        },
        [`&.MuiFormControlLabel-root > .MuiFormControl-root`]: {
            width: '358px',
        },
        [`&.MuiFormControlLabel-root .MuiFormHelperText-root`]: {
            fontSize: '20px',
            lineHeight: '2',
            marginTop: '10px',
            color: 'black',
            marginLeft: 0,
        },
        [`&.MuiFormControlLabel-root .MuiCheckbox-root`]: {
            paddingLeft: '0',
        },
    }));


    return (

        <FormControl variant="outlined" margin="normal">
            <StyledFormControlLabel labelPlacement='start' control={(props.dataType === 'boolean' || props.dataType === 'fixed')?
                <Checkbox name={props.name} onChange={props.onChangeHandler} checked={props.data ? props.data : false} disableRipple disabled={props.disabled ? true : false} />
                :
                <TextField name={props.name} onChange={props.onChangeHandler} value={props.data ? props.data : ''} variant="outlined"
                    helperText={props.helperText} FormHelperTextProps={{ component: "div", }} />} label={props.label} disabled={props.disabled ? true : false} />
        </FormControl>

    );
}