import React, { useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ajaxGetAdminDistributorsAutocomplete } from '../services/adminService';

export default function AdminDistributorAutocomplete({ setSearchResult, ...props }) {

    const [items, setItems] = React.useState([]);

    useEffect(() => {

        ajaxGetAdminDistributorsAutocomplete()
            .then(res => {
                const { data, } = res;
                setItems(data);
            }).catch(() => {
                setItems([]);
            });

    }, []);

    const searchChangeHandle = (event, value) => {
        setSearchResult(value ? value.id : '');
    }

    return (
        <Autocomplete
            {...props}
            disablePortal
            options={items}
            getOptionLabel={(option) => option.company_name}
            onChange={searchChangeHandle}
            renderInput={(params) => <TextField {...params} label="Company name" />}
        />);
}
