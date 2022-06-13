import React, { useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ajaxGetAdminProducts } from '../services/adminService';

export default function ProductCodeAutocomplete(props) {

    const [items, setItems] = React.useState([]);

    useEffect(() => {

        const params = { 'mode': 'enabled', };

        ajaxGetAdminProducts(params)
            .then(res => {
                const { data, } = res;
                setItems(data);
            }).catch(() => {
                setItems([]);
            });

    }, []);

    const searchChangeHandle = (event, value) => {
        props.setSearchResult(value ? value : false);
    }

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            getOptionDisabled={e => props.getOptionDisabled(e)}
            options={items}
            sx={{ width: 400 }}
            getOptionLabel={(option) => option.code}
            onChange={searchChangeHandle}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Product Code" />}
        />);
}
