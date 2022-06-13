import React from 'react';
import Box from '@mui/material/Box';


import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListSubheader } from '@mui/material';

import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { MoneyFormat } from '../../components/MoneyFormat';


export default function InventoryFooter(props) {

    const subheader = function () {
        return (
            <React.Fragment>
                <ListSubheader id="list-subheader" sx={{ padding: "20px 0 5px 5px", backgroundColor: 'black', marginLeft: props.marginLeft }}>
                    <Typography variant="h5" color="white" noWrap >
                        {props.sold ? 'Sold Inventory Stats' : 'Inventory Stats'}
                    </Typography>
                </ListSubheader>
                <Divider component="li" sx={{ backgroundColor: "#545454", marginBottom: "0" }} />
            </React.Fragment >
        );
    }

    function formatValue(item) {

        if (item.id === 'total-msrp-value') {

            return (
                <MoneyFormat
                    prefix="US$ "
                    value={item.value}
                    renderText={(value, props) => item.label + ': ' + value}
                />
            )

        } else {
            return item.label + ': ' + item.value;
        }

    }

    function getListItems(items) {


        var msrp_sum = 0;

        items.forEach((item) => {
            msrp_sum += parseFloat(item.msrp)
        });

        let listItems = [
            {
                id: 'total_products',
                label: 'Total Products',
                value: items.length,
            },
            {
                id: 'total-msrp-value',
                label: 'Total MSRP value',
                value: msrp_sum,
            },
        ];

        return listItems;

    }


    return (
        <Box sx={{
            height: '135px',
            backgroundColor: 'black',
            width: '100%',
            marginTop: 'auto',
        }}>
            <List
                subheader={subheader()}>

                {getListItems(props.items).map((item) => (
                    <ListItem key={item.id} disableGutters sx={{ padding: "5px 0 0 10px", marginLeft: props.marginLeft }} >
                        <ListItemText primaryTypographyProps={{ fontSize: '18px', color: 'white', }} primary={formatValue(item)} style={{ lineHeight: 1, margin: 0 }} />
                    </ListItem>
                ))}
            </List >
        </Box>
    );
}

