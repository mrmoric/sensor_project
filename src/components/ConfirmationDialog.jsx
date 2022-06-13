import React from 'react';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ConfirmationDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClose = (value) => {
        setOpen(false);
    };

    const dialogButtonStyle = {
        padding: '4px 30px',
    }

    return (
        <React.Fragment>
            <Button {...props.buttonProps} onClick={() => setOpen(true)}>{props.buttonText}</Button>
            <Dialog PaperProps={{ style: { opacity: 0.8, maxWidth: '354px', } }} onClose={handleClose} open={open}>
                <DialogContent>
                    <DialogContentText color="inherit" id="alert-dialog-description">
                        {props.dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ flex: "space-around", }}>
                    <Button style={dialogButtonStyle} variant="contained"
                        onClick={() => {
                            if (props.id) {
                                props.handleDialogClickYes(props.id);
                            } else {
                                props.handleDialogClickYes();
                            }
                            setOpen(false);
                        }} >{props.dialogYesText}</Button>
                    <Button style={dialogButtonStyle} variant="contained" onClick={handleClose}>{props.dialogNoText}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}