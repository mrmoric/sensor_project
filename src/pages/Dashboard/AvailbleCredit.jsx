import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import { MoneyFormat } from '../../components/MoneyFormat';

export function CompanyInfoPieChart(props) {

    const d = Number(props.creditLimit) > 0 ? (Number(props.creditUsed) / Number(props.creditLimit)) : 0;
    const f = 360;

    const data = [
        { name: 'Limit', value: (f - f * d) },
        { name: 'Used', value: f * d },
    ];

    const COLORS = ['#F2F2F2', '#29ABE2'];
    const margin = { 'top': 0, 'right': 30, 'bottom': 10, 'left': 0 };

    const inputGlobalStyles = <GlobalStyles styles={{ '.recharts-wrapper.available-credit svg': { overflow: 'inherit!important' } }} />;

    return (
        <React.Fragment>
            {inputGlobalStyles}
            <PieChart width={250} height={250} margin={margin} className="available-credit">
                <Pie data={data} dataKey="value" startAngle={-270} endAngle={270} outerRadius="121" fill="#29ABE2">
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie >
            </PieChart >
        </React.Fragment>
    );

}

export default function AvailbleCredit({ companyInfo }) {



    const showCompanyInfo = (companyInfo) => {
        return (
            <React.Fragment>
                <CompanyInfoPieChart creditLimit={companyInfo.credit_limit} creditUsed={companyInfo.credit_used} />
                <MoneyFormat prefix="$" suffix=" USD Used" value={companyInfo.credit_used} /> <br />
                <MoneyFormat prefix="$" suffix=" USD Credit" value={companyInfo.credit_limit} />
            </React.Fragment>
        );
    };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box >
                <Typography variant="h4" >
                    Credit Available
                </Typography>
            </Box>
            <Box sx={{ overflow: 'visible', textAlign: 'center', width: '250px' }}>
                {companyInfo ? showCompanyInfo(companyInfo) : ''}
            </Box>
        </Box >
    );
}