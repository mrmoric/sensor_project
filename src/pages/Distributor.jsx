import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import StyledMainGrid from '../components/StyledMainGrid';
import FormControl from '@mui/material/FormControl';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import { useNavigate, useParams } from "react-router-dom";
import {
    ajaxGetAdminDistributors,
    ajaxSaveAdminDistributor,
    ajaxDisableAdminDistributor,
    ajaxEnableAdminDistributor,
} from '../services/adminService';

import FileUploader from '../components/FileUploader';

import validator from 'validator';


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

export default function Distributor(props) {

    const incomingParams = useParams();

    const buttonStyle = {
        height: "40px",
        width: "150px",
        fontSize: "12px",
    }

    const allFields = [
        {
            key: "company_name",
            type: "text",
            label: "Company Name"
        },
        {
            key: "username",
            type: "text",
            label: "Username",
            autoComplete: "username",
        },
        {
            key: "password",
            type: "password",
            label: "Password",
            autoComplete: "new-password",
        },
        {
            key: "country",
            type: "text",
            label: "Country"
        },
        {
            key: "address",
            type: "text",
            label: "Address"
        },

        {
            key: "email",
            type: "text",
            label: "Email",
            autoComplete: "email",
        },
        {
            key: "email2",
            type: "text",
            label: "Email 2",
        },
        {
            key: "email3",
            type: "text",
            label: "Email 3",
        },
        {
            key: "email4",
            type: "text",
            label: "Email 4",
        },
        {
            key: "credit_limit",
            type: "text",
            label: "Credit Limit",
        },
        {
            key: "phone_number",
            type: "text",
            label: "Phone Number",
        },
        {
            key: "agreement",
            type: "file",
            label: "Upload Distributor Agreement",
        },

    ];

    var requiredFields = ["company_name", "username", "country", "address", "email", "credit_limit", "phone_number", "agreement",];
    var emailFields = ["email", "email2", "email3", "email4",];
    var numericFields = ["credit_limit", "phone_number",];

    if (props.add) {
        requiredFields.push("password");
    } else {
        requiredFields = requiredFields.filter(e => e !== 'agreement');
    }



    const [distributor, setDistributor] = useState({});
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();


    useEffect(() => {

        if (!props.add) {
            const params = {};

            if (incomingParams && incomingParams.CompanyId) {

                params.CompanyId = incomingParams.CompanyId;
            }

            ajaxGetAdminDistributors(params)
                .then(res => {
                    const { data, } = res;

                    setDistributor(data);
                }).catch(() => {
                    setDistributor({});
                });
        }

    }, [incomingParams, props.add]);

    const handleSave = () => {

        if (!validateFields()) return false;

        const params = { ...distributor };
        let url = "/dashboard/distributors";

        ajaxSaveAdminDistributor(params)
            .then(res => {
                //const { data, } = res;
                //setDistributor(data);

                navigate(url);
            }).catch(() => {
                //setDistributor(false);
                navigate(url);
            });
    };


    const validateFields = () => {


        var newErros = {};

        const fields = { ...distributor };

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

        setDistributor({ ...distributor, [key]: value });

    }

    const getFieldValue = key => {
        return (distributor && distributor[key]) ? distributor[key] : '';
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

    const handleUploadFile = e => {

        let key = e.target.name;
        let value = e.target.files[0];

        setDistributor({ ...distributor, [key]: value });

    };

    const handleDistributorToggle = (isEnabled, id) => {

        let ajaxMethod = ajaxDisableAdminDistributor;

        if (isEnabled) {
            ajaxMethod = ajaxEnableAdminDistributor;
        }

        ajaxMethod({ id: id }).then(res => {
            const { data, } = res;
            setDistributor(data);

        }).catch((e) => {

            console.log(e.message);

        });
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
                                    autoComplete={entry['autoComplete']}
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

                            {entry['type'] === "file" &&
                                <FileUploader
                                    error={checkFieldError(entry['key'])}
                                    accept=".pdf"
                                    name={entry['key']}
                                    label={entry['label']}
                                    icon={<AttachFileIcon />}
                                    handleChange={handleUploadFile}
                                />
                            }

                        </Grid>
                    </React.Fragment>
                ))}

                <Grid item lg={1} />
                <Grid item md={10} lg={11} >
                    {distributor && distributor['active'] > 0 && <Button onClick={() => handleDistributorToggle(false, distributor['id'])} variant="contained" size="normal" style={buttonStyle} sx={{ mr: "20px", backgroundColor: "red", }} >Disable Distributor</Button>}

                    {distributor && distributor['active'] < 1 && <Button onClick={() => handleDistributorToggle(true, distributor['id'])} variant="contained" size="normal" style={buttonStyle} sx={{ mr: "20px" }} >Enable distributor</Button>}

                    <Button variant="contained" size="normal" style={buttonStyle} sx={{ backgroundColor: "green", }} onClick={handleSave}>Save Distributor</Button>
                </Grid>
            </StyledMainGrid >
        </form>
    );
}