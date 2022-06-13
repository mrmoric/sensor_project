import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import StyledMainGrid from '../components/StyledMainGrid';
import FormControl from '@mui/material/FormControl';

import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import { useNavigate, useParams } from "react-router-dom";
import {
    ajaxGetAdminOptions,
    ajaxSaveAdminOption,
} from '../services/adminService';

import validator from 'validator';
import StyledSnackbar from '../components/StyledSnackbar';


const StyledFormControl = styled(FormControl)(({ theme }) => ({
    [`&.MuiFormControl-root`]: {
        flexDirection: "row",
        alignItems: "center",
    },
    [`&.MuiFormControl-root > .MuiFormLabel-root`]: {
        width: "150px",
        textAlign: "right",
        marginRight: "20px",
    },
    [`&.MuiFormControl-root > .MuiTextField-root`]: {
        width: "400px",
    },

}));

export default function Option(props) {

    const incomingParams = useParams();

    const buttonStyle = {
        height: "40px",
        width: "150px",
        fontSize: "12px",
    }

    const allFields = [
        {
            key: "code",
            type: "text",
            label: "API code"
        },
        {
            key: "label",
            type: "text",
            label: "Label",
        }
    ];

    var requiredFields = ["code", "label",];
    var emailFields = [];
    var numericFields = [];

    const [option, setOption] = useState({});
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        if (!props.add) {
            const params = {};

            if (incomingParams && incomingParams.OptionId) {

                params.OptionId = incomingParams.OptionId;
            }

            ajaxGetAdminOptions(params)
                .then(res => {
                    const { data, } = res;
                    setOption(data);
                }).catch(() => {
                    setOption({});
                });
        }

    }, [incomingParams, props.add]);

    const handleSave = () => {

        if (!validateFields()) return false;

        const params = { ...option };
        let url = "/dashboard/options";

        ajaxSaveAdminOption(params)
            .then(() => {
                navigate(url);
            }).catch((e) => {
                setServerError(e.message);
            });
    };


    const validateFields = () => {
        var newErros = {};
        const fields = { ...option };
        var result = true;

        for (let index in allFields) {

            let key = allFields[index].key;
            let fieldValue = fields[key] ? fields[key] + '' : '';

            if (validator.isEmpty(fieldValue, { 'ignore_whitespace': true })) {
                if (requiredFields.includes(key)) {
                    newErros[key] = 'required field';
                    result = false;
                }
            } else {

                if (emailFields.includes(key) && !validator.isEmail(fieldValue)) {
                    newErros[key] = 'bad email format';
                    result = false;
                }
            }
        }

        if (Object.keys(newErros).length !== 0) {
            setErrors(newErros);
        }

        return result;

    }

    const handleFieldChange = event => {
        let value = event.target.value,
            key = event.target.name;

        if (numericFields.includes(key)) {
            value = value.replace(/\D/g, '');
        }

        setOption({ ...option, [key]: value });

    }

    const getFieldValue = key => {
        return (option && option[key]) ? option[key] : '';
    }

    const getFieldPlaceholder = key => {
        return (key === "password" && !props.add) ? "leave blank to not change the password" : "";
    }

    const getFieldErrorText = key => {

        if (errors && errors[key]) return errors[key];
        else return "";



    }

    const checkFieldError = key => {

        if (errors && errors[key]) return true;
        else return false;

    }

    return (
        <form>
            <StyledMainGrid container direction="row" rowSpacing={"20px"} sx={{ mt: "20px", }}>

                {allFields.map((entry, index) => (

                    <React.Fragment key={entry['key']}>

                        <Grid item lg={1} />
                        <Grid item md={10} lg={11} >

                            {(entry['type'] === "text" || entry['type'] === 'password') && <StyledFormControl>
                                <FormLabel>{entry['label']}:</FormLabel >
                                <TextField
                                    type={entry['type']} name={entry['key']}
                                    value={getFieldValue(entry['key'])}
                                    onChange={handleFieldChange}
                                    error={checkFieldError(entry['key'])}
                                    label={getFieldErrorText(entry['key'])}
                                    placeholder={getFieldPlaceholder(entry['key'])}
                                    variant="outlined"
                                />
                            </StyledFormControl>
                            }

                        </Grid>
                    </React.Fragment>
                ))}

                <Grid item lg={1} />
                <Grid item md={10} lg={11} >
                    <Button variant="contained" size="normal" style={buttonStyle} sx={{ backgroundColor: "green", }} onClick={handleSave}>Save Option</Button>
                    {serverError && <StyledSnackbar text={serverError} severity="error" onClose={() => setServerError(false)} />}
                </Grid>
            </StyledMainGrid >
        </form>
    );
}