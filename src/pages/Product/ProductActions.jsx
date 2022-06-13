import React, { useState } from 'react';
import Button from '@mui/material/Button';

import ProductOptionDialog from './ProductOptionDialog';


export default function ProductActions({ product, handleSaveProduct, handleProductDisable, handleProductEnable, handleOptionSave }) {

    const [isOpenedModal, setIsOpenedModal] = useState(false);

    const buttonStyle = {
        height: "40px",
        width: "150px",
        fontSize: "12px",
    }

    const handleHideModal = (e) => {
        setIsOpenedModal(false);

        if (e && e.button === "save") {
            handleOptionSave();
        }
    }

    const showOtherButtons = () => {

        const buttonProps = {
            style: { ...buttonStyle, marginRight: "20px", },
            variant: "contained",
            size: "normal",
        }


        return (
            <React.Fragment>
                {product && product.active > 0 ?
                    <Button variant="contained" size="normal" style={buttonStyle} sx={{ mr: "20px", backgroundColor: "red", }} onClick={handleProductDisable}>Disable Product</Button>
                    :
                    <Button variant="contained" size="normal" style={buttonStyle} sx={{ mr: "20px" }} onClick={handleProductEnable}>Enable Product</Button>
                }
                <Button {...buttonProps} onClick={() => setIsOpenedModal(true)}>Add Option</Button>

                <ProductOptionDialog
                    productId={product.id}
                    show={isOpenedModal}
                    onHide={handleHideModal}
                    dialogTitle="Add Option"
                    dialogText="Add new product option"
                    dialogNoText="Cancel" />

            </React.Fragment>
        );

    }

    return (
        <React.Fragment>
            {product && product.id ? showOtherButtons() : ''}
            <Button variant="contained" size="normal" style={buttonStyle} sx={{ backgroundColor: "green", }} onClick={handleSaveProduct}>Save Product</Button>
        </React.Fragment>
    );
}