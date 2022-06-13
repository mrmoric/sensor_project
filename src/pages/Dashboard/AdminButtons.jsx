import React, { useState } from 'react';

import { Link as RouterLink } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import RecievePaymentDialog from './RecievePaymentDialog';

export default function AdminButtons({ companyId, handleCompanyUpdate }) {

    const viewSaleStyle = {
        height: "30px",
        width: "200px",
        fontSize: "20px",
        marginTop: "10px",
        padding: "25px 5px",
    };

    const viewInventoryStyle = { ...viewSaleStyle, width: "300px" };
    const recievePaymentStyle = { ...viewSaleStyle, width: "200px" };
    const exportReportStyle = { ...viewSaleStyle, width: "150px" };

    const viewInventoryHref = '/dashboard/inventory/' + encodeURIComponent(companyId);
    const viewSalesHref = '/dashboard/inventory/sold/' + encodeURIComponent(companyId);

    const [isOpenedRecievePaymentModal, setIsOpenedRecievePaymentModal] = useState(false);

    const handleHideRecievePaymentModal = params => {
        setIsOpenedRecievePaymentModal(false);

        if (params['button'] === 'save') {
            handleCompanyUpdate();
        }

    }

    return (
        <React.Fragment>
            <Grid container sx={{ maxWidth: "450px", }}>
                <Grid item lg={6}>
                    <Button variant="contained" style={recievePaymentStyle} onClick={() => setIsOpenedRecievePaymentModal(true)}>Recieve Payment</Button>
                </Grid>
                <Grid item lg={6}>
                    <Button variant="contained" style={exportReportStyle} component={RouterLink} to={viewInventoryHref}>Export Report</Button>
                </Grid>
                <Grid item lg={6}>
                    <Button variant="contained" style={viewSaleStyle} component={RouterLink} to={viewSalesHref}>View Sales Report</Button>
                </Grid>
                <Grid item lg={6}>
                    <Button variant="contained" style={viewInventoryStyle} component={RouterLink} to={viewInventoryHref}>View Distributor Inventory</Button>
                </Grid>
            </Grid>
            <RecievePaymentDialog
                dialogTitle="Recieve Payment"
                dialogText="Enter the amount of money the company has paid"
                dialogNoText="Cancel"
                companyId={companyId}
                show={isOpenedRecievePaymentModal}
                onHide={handleHideRecievePaymentModal}
            />
        </React.Fragment>
    );

}

