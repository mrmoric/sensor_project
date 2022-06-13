import React, { useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ajaxGetProductOptionCodes } from '../services/inventoryService';

export default function ProductOptionCodeAutocomplete({ error, helperText, onChange, id, value }) {
    const [items, setItems] = React.useState([]);

    
    useEffect(() => {

        ajaxGetProductOptionCodes()
            .then(res => {
                const { data, } = res;
                setItems(data);
            }).catch(() => {
                setItems([]);
            });

    }, []);

    const getValue = () => {
        let item = "";
        if (value) item = items.find((item) => (item.id === value));
        return item;
    }

    const getOptionLabel = (option) => {
        return option ? option.label : '';
    }
    
    return (
        <React.Fragment>
        {items.length > 0 &&
            <Autocomplete
                disablePortal
                options={items}
                sx={{ width: 400 }}
                id={id}
                value={getValue()}
                getOptionLabel={getOptionLabel}
                fullWidth
                onChange={onChange}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Option Code"
                        variant="standard"
                        error={error}
                        helperText={helperText}
                    />
                }
                ListboxProps={
                    {
                        style: {
                            maxHeight: '150px',
                        }
                    }
                }
            
            />
        }
        </React.Fragment>
    );
}
