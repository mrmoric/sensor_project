import React, { useContext } from 'react';

import { Link as RouterLink, useNavigate } from "react-router-dom";

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ListSubheader } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import { ajaxLogout } from '../../services/authenticationService';

import inMemoryUser from '../../services/inMemoryUser';

import { AuthContext } from '../../context';
import SidebarFooter from './SidebarFooter';

export default function Sidebar() {

    const { changeIsUserLogged } = useContext(AuthContext);

    let menuItems = [];



    if (inMemoryUser.isDistributor()) {

        menuItems = [
            {
                id: 'dashboard',
                label: 'View Summary',
                href: '/dashboard',
            },
            {
                id: 'view-inventrory',
                label: 'View Inventory',
                href: '/dashboard/inventory',
            },
            {
                id: 'make-sale',
                label: 'Make Sale',
                href: '/dashboard/make-sale',
            },
            {
                id: 'view-sold-inventrory',
                label: 'View Sold Inventory',
                href: '/dashboard/inventory/sold',
            },
            {
                id: 'logout',
                label: 'Logout',
                href: '/',
            },
        ];

    } else if (inMemoryUser.isAdmin()) {

        menuItems = [
            {
                id: 'dashboard',
                label: 'View Summary',
                href: '/dashboard',
            },
            {
                id: 'products',
                label: 'Add / Edit Product',
                href: '/dashboard/products',
            },
            {
                id: 'options',
                label: 'Add / Edit Option',
                href: '/dashboard/options',
            },
            {
                id: 'distributors',
                label: 'Add / Edit Distributor',
                href: '/dashboard/distributors',
            },
            {
                id: 'distributor',
                label: 'View Distributor',
                href: '/dashboard/distributor',
            },
            {
                id: 'add_shipment',
                label: 'Add Shipment',
                href: '/dashboard/add-shipment',
            },
            {
                id: 'logout',
                label: 'Logout',
                href: '/',
            },
        ];

    }

    const navigate = useNavigate();

    const handleLogout = event => {
        event.preventDefault();

        ajaxLogout()
            .then(() => {
                changeIsUserLogged(false);
                navigate("/");
            }).catch(console.error);
    };

    const getSubheader = function () {
        return (
            <React.Fragment>
                <ListSubheader id="nav-list-subheader" color="inherit">
                    <Typography variant="h5" color="inherit" noWrap sx={{ padding: "10px 5px" }}>
                        What would you like to do?
                    </Typography>
                </ListSubheader>
                <Divider component="li" sx={{ backgroundColor: "#545454", marginBottom: "0" }} />
            </React.Fragment>
        );
    }


    return (
        <Drawer variant="permanent" anchor={'right'}>
            <Toolbar />
            <Box role="presentation">
                <List
                    component="nav"
                    aria-labelledby="nav-list-subheader"
                    subheader={getSubheader()}>

                    {menuItems.map((menuItem) => (

                        <ListItem key={menuItem.id} disableGutters sx={{ padding: "0 10px" }} >

                            {menuItem.id !== 'logout' ?
                                <ListItemButton component={RouterLink} to={menuItem.href}>
                                    <ListItemText primaryTypographyProps={{ fontSize: '20px' }} primary={menuItem.label} style={{ lineHeight: 1, margin: 0 }} />
                                </ListItemButton>
                                :
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemText primaryTypographyProps={{ fontSize: '20px' }} primary={menuItem.label} style={{ lineHeight: 1, margin: 0 }} />
                                </ListItemButton>
                            }
                        </ListItem>

                    ))}
                </List >
            </Box >

            {inMemoryUser.isDistributor() ? <SidebarFooter /> : ''}
        </Drawer>
    );
}
