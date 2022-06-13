import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';

import Switch from '@mui/material/Switch';

import ProductOptionDialog from './ProductOptionDialog';

export default function ProductOptions({ productOptions, handleToggleActive, handleOptionSave }) {

    const [activeModal, setActiveModal] = useState(false);

    let getOptionLabel = (title, index) => {
        return "Option" + (index + 1) + ": '" + title + "'";
    }

    const handleEditClick = (index) => {
        setActiveModal(index);
    }

    const handleHideModal = (e) => {
        setActiveModal(false);

        if (e && e.button === "save") {
            handleOptionSave();
        }
    }


    return (
        <List sx={{ width: '100%', maxWidth: 360, }}>
            {productOptions.map((item, index) => (
                <ListItem
                    key={item.id}

                    disablePadding

                    secondaryAction={<React.Fragment>

                        <Switch
                            edge="start"
                            checked={item.active > 0}
                            onChange={() => handleToggleActive(item, index)}

                        /></React.Fragment>
                    }

                >
                    <ListItemButton dense>

                        <ListItemIcon onClick={() => handleEditClick(item.id)} >
                            <EditIcon />
                        </ListItemIcon>
                        <ProductOptionDialog
                            data={item}
                            handleAfterSave={() => { }}
                            productId={item.product_code_id}
                            show={activeModal === item.id}
                            onHide={handleHideModal}
                            dialogTitle="Edit Option"
                            dialogText="Edit product option"
                            dialogNoText="Cancel" />
                        <ListItemText style={{ textDecoration: item.active > 0 ? 'none' : 'line-through' }} primary={getOptionLabel(item.title, index)} />
                    </ListItemButton>

                </ListItem>
            ))}
        </List>

    );
}