import React from 'react';


import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';


import AdminDistributorAutocomplete from '../../components/AdminDistributorAutocomplete';
import FileUploader from '../../components/FileUploader';


export default function AddShipmentFields({ fields, handleChange }) {

    const handleUploadFile = e => {

        handleChange(e.target.name, e.target.files[0]);

    };


    return (
        <React.Fragment>
            <Grid item md={12} lg={12}>
                <AdminDistributorAutocomplete setSearchResult={v => handleChange('company_id', v)} sx={{ width: "440px", }} />
            </Grid>

            <Grid item md={12} lg={12}>
                <TextField
                    label="AWB"
                    name="awb"
                    variant="outlined"
                    value={fields && fields["awb"] ? fields["awb"] : ""}
                    onChange={e => handleChange(e.target.name, e.target.value)}
                    sx={{ mr: "20px", }}
                />

                <TextField
                    label="Tracking hyperlink"
                    name="tracking_hyperlink"
                    variant="outlined"
                    value={fields && fields["tracking_hyperlink"] ? fields["tracking_hyperlink"] : ""}
                    onChange={e => handleChange(e.target.name, e.target.value)}
                />


            </Grid>
            <Grid item md={12} lg={12}>
                <FileUploader accept=".pdf" name="file_invoice" label="Upload Invoice" icon={<AttachFileIcon />} handleChange={handleUploadFile} />
                <FileUploader accept=".pdf" name="file_packing_list" label="Upload Packing List" icon={<AttachFileIcon />} handleChange={handleUploadFile} />
            </Grid>
        </React.Fragment>
    );

}
