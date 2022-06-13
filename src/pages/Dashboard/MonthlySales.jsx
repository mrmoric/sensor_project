import React, { useState, useEffect } from 'react';

import { ajaxGetCompanySales } from '../../services/companyService';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,

} from "recharts";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function MonthlySales(props) {

    const [sales, setSales] = useState(false);

    const getMonthTitle = (monthNumber) => {

        let num = Number(monthNumber);
        let result = '';

        switch (num) {
            case 1:
                result = 'Jan';
                break;
            case 2:
                result = 'Feb';
                break;
            case 3:
                result = 'Mar';
                break;
            case 4:
                result = 'Apr';
                break;
            case 5:
                result = 'May';
                break;
            case 6:
                result = 'Jun';
                break;
            case 7:
                result = 'Jul';
                break;
            case 8:
                result = 'Aug';
                break;
            case 9:
                result = 'Sep';
                break;
            case 10:
                result = 'Oct';
                break;
            case 11:
                result = 'Nov';
                break;
            case 12:
                result = 'Dec';
                break;
            default:
                result = 'Error';
                break;
        }

        return result;


    }

    useEffect(() => {
        let data = [];

        if (props.companyId) {
            data.companyId = props.companyId;
        }

        ajaxGetCompanySales(data)
            .then(res => {
                const { data, } = res;

                let preparedData = data.map((item) => (
                    {
                        pv: item.credit_used,
                        name: getMonthTitle(item.month),
                    }
                ));



                setSales(preparedData);
            }).catch(() => {
                setSales(false);
            });

    }, [props]);

    const showSales = (sales) => {
        return (
            <LineChart
                layout="horizontal"
                width={617}
                height={262}
                data={sales}
                margin={{
                    right: 30,
                    left: 20,
                    bottom: -10,
                }}
            >
                <CartesianGrid />
                <XAxis dataKey="name" type="category" padding={{ left: 30, right: 30 }} stroke="black" />
                <YAxis ticks={[250000, 500000, 750000, 1000000]} type="number" padding={{ top: 30 }} stroke="black" />
                <Line dataKey="pv" stroke="#70C197" strokeWidth={3} />
            </LineChart>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',

        }}
        >
            <Box >
                <Typography variant="h4" sx={{ ml: "77px" }} >
                    Monthly Sales
                </Typography>
            </Box>
            <Box>
                {sales ? showSales(sales) : ''}
            </Box>
            <Box sx={{ height: "50px" }}></Box>
        </Box>
    );
}