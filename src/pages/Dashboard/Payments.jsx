import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { MoneyFormat } from '../../components/MoneyFormat';

export default function Payments({ companyInfo }) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box>
                <Typography variant="h4" >
                    Payments
                </Typography>
            </Box>
            <Box>
                <Typography>Due date of the next payment</Typography>
                <Typography>{companyInfo['due_date']}</Typography>
            </Box>
            <Box sx={{ mt: "15px", }}>
                <Typography>Total Due</Typography>
                <Typography><MoneyFormat prefix="$" suffix=" USD" value={companyInfo['credit_used']} /></Typography>
            </Box>
        </Box>
    );
}