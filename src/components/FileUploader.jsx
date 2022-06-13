import React from "react";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

export default function FileUploader({ accept, label, icon, handleChange, name, error }) {

    const [isUploadedFile, setUploadedFile] = React.useState(false);

    const handleFileChange = (e) => {

        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            handleChange(e);
        }

    }

    var buttonStyle = {
        fontSize: "12px",
    }

    if (error) buttonStyle['color'] = 'red';

    return (
        <label htmlFor={name} >
            <Input accept={accept} id={name} name={name} multiple type="file" onChange={handleFileChange} />
            <Button startIcon={icon ? icon : ''} variant="text" component="span" style={buttonStyle}>
                {label} {isUploadedFile ? <CheckIcon sx={{ color: "green", ml: "5px", mb: "5px" }} /> : ''}
            </Button>
        </label>
    );
}