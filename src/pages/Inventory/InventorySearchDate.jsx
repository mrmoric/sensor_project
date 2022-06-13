import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';


export default function InventorySearchDate(props) {

    return (
        <Box sx={{ display: 'flex', maxWidth: props.tableWidth, marginLeft: props.marginLeft, marginTop: '30px', }}>
            <TextField
                placeholder='Date'
                id="search-date-start"
                type="datetime-local"
                sx={{ width: 'calc(50%)', }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Typography variant="div" sx={{ marginLeft: '30px', fontSize: '16px', marginTop: '15px', }}>To</Typography>
            <TextField
                placeholder='Date'
                id="search-date-end"
                type="datetime-local"
                sx={{ marginLeft: '30px', width: 'calc(50% - 30px)', }}
                InputLabelProps={{
                    shrink: true,
                }}
            />

        </Box>
    );
}