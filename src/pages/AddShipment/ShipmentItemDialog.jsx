import React from 'react';


import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


import useAlert from '../../hooks/useAlert';

import ProductCodeAutocomplete from '../../components/ProductCodeAutocomplete';
import FileUploader from '../../components/FileUploader';


export default function ShipmentItemDialog(props) {

    const [open, setOpen] = React.useState(false);

    const [fields, setFields] = React.useState({ 'quantity': 1 });

    const errorAlert = useAlert(false, 'error');

    const handleClose = (value) => {
        setOpen(false);
        setFields({ 'quantity': 1 });
        errorAlert.resetAlert();
    };



    const handleChangeField = event => {

        let value = event.target.value;
        let key = event.target.name;

        if (key === "quantity") {
            value = value.replace(/\D/g, '');
        }

        let copyFields = { ...fields };

        copyFields[key] = value;

        setFields(copyFields);

    }

    const handleChangeProductCode = productCode => {

        setFields({ ...fields, 'code': productCode['code'], 'id': productCode['id'] });

    }

    const handleUploadFileCSV = e => {

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {

            var stringData = e.target.result;

            /* if ( stringData.indexOf(",") < 1 ) {
 
             }*/


            setFields({ ...fields, 'keys': stringData.split(',') });
        };

    }

    const handleSave = () => {

        if (!fields['code']) {
            errorAlert.setAlert('You have to choose a Product Code');
            return false;
        }

        if (!fields['keys']) {
            errorAlert.setAlert('You have to attach a CSV file with keys');
            return false;
        } else if (fields['keys'].length !== Number(fields['quantity'])) {
            errorAlert.setAlert('CSV file has ' + fields['keys'].length + ' keys. There should be ' + fields['quantity'] + ' keys.');
            return false;
        }

        props.handleDialogClickYes(fields);

        handleClose();
    }

    const dialogButtonStyle = {
        padding: '4px 30px',
    }

    const dialogHeight = errorAlert.alert ? "330px" : "270px";

    return (
        <React.Fragment>

            <IconButton {...props.buttonProps} onClick={() => setOpen(true)} >< AddCircleOutlineIcon /></IconButton>

            <Dialog fullWidth PaperProps={{ style: { backgroundColor: "white", color: "black", } }} onClose={handleClose} open={open}>
                <DialogContent sx={{ height: dialogHeight, }}>
                    <DialogContentText color="inherit" id="alert-dialog-description" sx={{ mb: "10px", fontSize: "1.5rem", fontWeight: 400, }}>
                        {props.dialogText}
                    </DialogContentText>

                    <Grid container direction="row" rowSpacing="10px">

                        <Grid item md={12} lg={12}>
                            <ProductCodeAutocomplete setSearchResult={handleChangeProductCode} getOptionDisabled={item => props.excludedProductCodes.filter(value => value === item['code']).length > 0} />
                        </Grid>

                        <Grid item md={12} lg={12}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                variant="outlined"
                                value={fields["quantity"]}
                                onChange={handleChangeField}
                                fullWidth
                            />
                        </Grid>

                        <Grid item md={12} lg={12}>
                            <FileUploader accept=".csv" name="file_keys" label="Upload CSV File with Keys" icon={<AttachFileIcon />} handleChange={handleUploadFileCSV} />
                        </Grid>
                        <Grid item md={12} lg={12}>
                            {errorAlert.showAlert()}
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions style={{ flex: "space-around", }}>
                    <Button style={dialogButtonStyle} variant="contained"
                        onClick={handleSave} >{props.dialogYesText}</Button>
                    <Button style={dialogButtonStyle} variant="contained" onClick={handleClose}>{props.dialogNoText}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}