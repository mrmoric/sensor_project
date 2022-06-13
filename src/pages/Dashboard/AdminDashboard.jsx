import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StyledMainGrid from '../../components/StyledMainGrid';

import OutboundShipments from './OutboundShipments';

import inMemoryUser from '../../services/inMemoryUser';

export default function AdminDashboard() {


    const hello_message = inMemoryUser.getUsername();

    return (
        <StyledMainGrid container direction="row" rowSpacing={"22px"}>
            <Grid item lg={1} />
            <Grid item md={11} lg={11} sx={{ mt: "53px", mb: "11px" }} >
                {hello_message ?
                    <Typography variant="h4" >
                        Welcome Back {hello_message}!
                    </Typography>
                    : ''}
            </Grid>
            <Grid item lg={1} />
            <Grid item md={11} lg={11} >
                <OutboundShipments />
            </Grid>
        </StyledMainGrid >
    );
}

