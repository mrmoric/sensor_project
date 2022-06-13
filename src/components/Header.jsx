import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, useRoutes } from "react-router-dom";

import { makeStyles } from '@mui/styles';

import { AuthContext } from '../context';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: (theme.zIndex.drawer + 1) + "!important",
    },
    logo: {
        height: "45px",
        marginLeft: "5px",
        marginTop: "5px",
    },

}));

export default function Header(props) {

    const { isUserLogged } = useContext(AuthContext);

    const classes = useStyles();

    const pageTitle = useRoutes([
        { path: "/dashboard/add-shipment", element: "Add Shipment", },
        { path: "/dashboard/options", element: "Add / Edit Option", },
        { path: "/dashboard/options/*", element: "Add / Edit Option", },
        { path: "/dashboard/products", element: "Add / Edit Product", },
        { path: "/dashboard/products/*", element: "Add / Edit Product", },
        { path: "/dashboard/distributor", element: "View Distributor", },
        { path: "/dashboard/distributors", element: "Add / Edit Distributor", },
        { path: "/dashboard/distributors/*", element: "Add / Edit Distributor", },
        { path: "/dashboard/inventory/sold", element: "View Sold Inventory", },
        { path: "/dashboard/inventory/sold/*", element: "View Sold Inventory", },
        { path: "/dashboard/inventory", element: "View Inventory", },
        { path: "/dashboard/inventory/*", element: "View Inventory", },
        { path: "/dashboard/make-sale/*", element: "Make Sale", },
        { path: "/dashboard/", element: "Summary", },
        { path: "/", element: "Login", },
    ]);

    const width = isUserLogged ? "calc(100% - 380px)" : "100%";

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar disableGutters>
                    <Grid container direction="row" alignItems="center" rowSpacing={0} spacing={0} columnSpacing={0} sx={{ width: width, }}>
                        <Grid item sm={6} md={5}  >
                            <Link to="/dashboard">
                                <Box className={classes.logo} component="img" src="/akcp.png" alt="logo" />
                            </Link>
                        </Grid>
                        <Grid item sm={6} md={7}>
                            <Typography variant="h4" color="inherit" noWrap>
                                Distributor Portal - {pageTitle}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment >
    );
}
