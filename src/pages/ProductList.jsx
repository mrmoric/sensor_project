import React, { useEffect } from 'react';

import { Link as RouterLink } from "react-router-dom";

import Link from '@mui/material/Link';

import Grid from '@mui/material/Grid';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

import { MoneyFormat } from '../components/MoneyFormat';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import StyledMainGrid from '../components/StyledMainGrid';
import StyledTable from '../components/StyledTable';

import { ajaxGetAdminProducts } from '../services/adminService';

export default function ProductList() {

    const columns = [
        {
            id: 'code',
            value: 'Product Code',
            sort: true,
            width: '20%',
        },
        {
            id: 'description',
            value: 'Description',
            sort: false,
            width: '40%',
        },
        {
            id: 'msrp',
            value: 'MSRP',
            sort: true,
            width: '15%',
        },
        {
            id: 'active',
            value: 'Disabled',
            sort: true,
            width: '15%',
        },
        {
            id: 'action',
            value: '',
            sort: false,
            width: '10%',
        },
    ];

    const [items, setItems] = React.useState([]);

    const [searchTerm, setSearchTerm] = React.useState("");

    const [searchResults, setSearchResults] = React.useState([]);

    const searchFilter = "description";


    const showItemHandle = (item, type) => {



        if (type === 'head') {
            return item.value;
        } else {
            if (item.row.id !== 0) {

                if (item.id === 'action') {
                    return (
                        <Link component={RouterLink} to={"/dashboard/products/edit/" + item.row.id} >
                            <EditOutlinedIcon />
                        </Link>

                    );
                }
                else if (item.id === 'msrp') {
                    return (<MoneyFormat isNumericString prefix="US$ " value={item.value} />);
                }
                else if (item.id === 'active') {
                    return (item.value ? "no" : "yes");
                }
                else return item.value;

            } else {
                if (item.id === 'action') {
                    return (
                        <Link component={RouterLink} to={"/dashboard/products/add"} >
                            <AddCircleOutlineIcon />
                        </Link>

                    );
                }
            }
        }




    }

    const searchChangeHandle = event => {
        const new_value = event.target.value.toLowerCase();
        setSearchTerm(new_value);
    }

    useEffect(() => {

        const params = {};

        ajaxGetAdminProducts(params)
            .then(res => {
                const { data, } = res;
                setItems(data);
            }).catch(() => {
                setItems([]);
            });

    }, []);


    useEffect(() => {
        const results = items.filter(item =>
            (item[searchFilter] ? item[searchFilter] : '').toLowerCase().includes(searchTerm)
        );

        setSearchResults(results);

    }, [searchTerm, /*searchFilter,*/ items]);

    return (
        <StyledMainGrid container direction="row" rowSpacing={"22px"}>
            <Grid item lg={1} />
            <Grid item md={11} lg={11} sx={{ mt: "53px", }} >
                <FormControl sx={{ width: '400px', mb: "20px" }} variant="outlined">
                    <OutlinedInput id="search-input" type="text" placeholder='Search keyword' onChange={searchChangeHandle}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        } />
                </FormControl>
                <StyledTable grey addLastRowEmpty sx={{ maxWidth: "663px", }} TableColumns={columns} TableRows={searchResults} showItem={showItemHandle} />
            </Grid>
        </StyledMainGrid >
    );
}