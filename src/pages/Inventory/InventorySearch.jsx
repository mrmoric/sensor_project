import React from 'react';
import Box from '@mui/material/Box';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        opacity: '0.8!important',
    },
}));


export default function InventorySearch(props) {

    const classes = useStyles();

    const handleSearchChange = event => {
        const new_value = event.target.value.toLowerCase();
        props.setSearchTerm(new_value);
    }

    const handleFilterChange = event => {
        props.setSearchFilter(event.target.value);
    }

    return (
        <Box sx={{ display: 'flex', maxWidth: props.tableWidth, marginLeft: props.marginLeft, marginTop: '100px', }}>
            <FormControl sx={{ width: 'calc(50% - 25px)', }} variant="outlined">
                <OutlinedInput id="search-input" type="text" placeholder='Search Serial No. MAC ID or Prod Code' onChange={handleSearchChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    } />
            </FormControl>

            <Box sx={{ marginLeft: '50px', width: 'calc(50% - 25px)', display: 'flex', alignItems: 'center', }}>
                <FilterAltOutlinedIcon />
                <TextField
                    fullWidth
                    id="search-select"
                    value={props.searchFilter}
                    onChange={handleFilterChange}
                    SelectProps={{
                        MenuProps: {
                            classes: { paper: classes.paper }
                        },
                    }}

                    select
                >
                    {props.searchFilters.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>


        </Box>
    );
}