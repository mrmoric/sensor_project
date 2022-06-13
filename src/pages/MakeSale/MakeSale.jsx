import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { ajaxGetInventoryItem } from '../../services/inventoryService';
import { ajaxGenerateLicense, ajaxMakeSale } from '../../services/companyService';

import StyledMainGrid from '../../components/StyledMainGrid';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { MoneyFormat } from '../../components/MoneyFormat';

import StyledSnackbar from '../../components/StyledSnackbar';

import MakeSaleFormControl from './MakeSaleFormControl';
import ProductOptionsFields from './ProductOptionsFields';




export default function MakeSale() {

    let params = useParams();

    const [productData, setProductData] = useState(false);
    const [mackSerialField, setMackSerialField] = useState("");
    const [controlData, setControlData] = useState([]);
    const [newControlData, setNewControlData] = useState([]);
    const [isPageLoaded, setPageIsLoaded] = useState(false);

    const [makeSaleError, setMakeSaleError] = useState(false);
    const [makeSaleDone, setMakeSaleDone] = useState(false);


    const popupButtonStyle = {
        marginRight: "40px",
        height: "80px",
        width: "353px",
        fontSize: "48px",
    }



    const showProductFields = value => {

        setControlData([]);
        setNewControlData([]);

        let data = {
            value,
        };

        setMackSerialField(value);

        if (value.length > 5) {
            ajaxGetInventoryItem(data)
                .then(res => {

                    const { data, } = res;
                    setProductData(data);

                }).catch(() => {
                    setProductData(false);

                });
        }
    }

    useEffect(() => {

        if (!isPageLoaded) {

            if (params && params.MacOrSerial) {

                let value = params.MacOrSerial;
                showProductFields(value);

                setPageIsLoaded(true);

            }
        }

    }, [isPageLoaded, params]);


    const handleChangeProductSerial = event => {
        const value = event.target.value;

        if (event.target.name === "mac_id_or_serial_number") {
            showProductFields(value);

        }

    };

    const getProductSerialHelperText = () => {
        if (productData) {
            return (
                <React.Fragment>
                    <Box>Product Code: {productData.product_code}</Box>
                    <Box>MSRP: <MoneyFormat prefix="US$ " value={productData.msrp} /></Box>
                </React.Fragment>
            );
        }

    }


    const handleMakeSale = () => {

        var selectedProductOptions = [];
        var newSelectedOptionsOnly = [];

        if (productData.sold_date && newControlData.length < 1) {
            setMakeSaleError("You haven't add any new options to the sale!");
            return;
        }

        productData.options.forEach((item) => {
            const item_name = 'option_' + item.id;
            if (controlData[item_name]) {

                let selected_option = {
                    'id': item.id,
                    'option_code_id': item.option_code_id,
                    'value': controlData[item_name],
                };

                selectedProductOptions.push(selected_option);

            }

            if (newControlData[item_name]) {

                let selected_option = {
                    'id': item.id,
                    'option_code_id': item.option_code_id,
                    'value': newControlData[item_name],
                };

                newSelectedOptionsOnly.push(selected_option);

            }
        });


        let params = {
            'serial': productData.serial_key,
            'options': JSON.stringify(newSelectedOptionsOnly),
        };
 
        ajaxGenerateLicense(params)
            .then(res => {
            
                const { license } = res;
               saveSaleWithLicense(productData.id, license, selectedProductOptions);

        })
        .catch((e) => {
            setMakeSaleError(e.message)
        });

    };

    const saveSaleWithLicense = (id, license, options) => {
        params = {
            'id': id,
            'license': license,
            'options': JSON.stringify(options),
        };

        setControlData([]);
        setNewControlData([]);

        ajaxMakeSale(params)
            .then(res => {
                const { message, status } = res;

                if (status !== 'ok') {
                    setMakeSaleError(message)
                } else {
                    setMakeSaleDone(message);

                    setProductData(false);
                    setMackSerialField("");
                }

            }).catch((e) => {
                setMakeSaleError(e.message)

            });
    }

    const hasFeatureWithGreaterFixedValue = (item, totalFeatures) => {
        let search_id = item.option_code_id;
        let fixed_value = parseFloat(item.fixed_value);
        let sameFeatures = totalFeatures.filter(item => (item.option_code_id === search_id && parseFloat(item.data.fixed_value) > fixed_value));
        return sameFeatures.length > 0;
    }

    const deleteFeatureFromTotal = (item, totalFeatures) => {
        let search_id = item.option_code_id;    
        let updatedFeatures = totalFeatures.filter(item => (item.option_code_id !== search_id));
        return updatedFeatures; 
    }


    const showTotalCost = () => {

        var total = productData.msrp;
        var totalFeatures = [];

        productData.options.forEach((item) => {
            const item_name = 'option_' + item.id;
            if (controlData[item_name]) {

                var k = 1;

                if (item.type === "integer") {
                    k = parseFloat(controlData[item_name]);
                }

                if (item.type === "fixed") {
                    k = parseFloat(item.fixed_value);
                    let check = hasFeatureWithGreaterFixedValue(item, totalFeatures);
                    if (check) {
                        return; // don't include it to total calculation
                    }  
                    else {
                        totalFeatures = deleteFeatureFromTotal(item, totalFeatures);
                    }
                }

                totalFeatures.push({ option_code_id : item.option_code_id , msrp: k * parseFloat(item.price), data: item});
            }
        });

        totalFeatures.forEach((item) => { 
            total += item.msrp; 
        });

        return (
            <MoneyFormat prefix="US$ " value={total} />
        );
    }

    const getConfirmationDialogText = () => {
        
        let text = "Once sale is confirmed the product will be deducted from your inventory and billed to your account.";
        if (productData['sold_date']) {
            text = "Once sale is confirmed new features will be added to the sold product and your account credit will be updated.";
        }

        return text;
    }



    return (
        <StyledMainGrid container direction="row" rowSpacing={"22px"} columnSpacing={0}>

            <Grid item md={1} />
            <Grid item container md={11} >
                <Grid item md={12} sx={{ mt: "53px" }}  >
                    <MakeSaleFormControl name="mac_id_or_serial_number" type="text" onChangeHandler={handleChangeProductSerial} label="MAC ID / Serial Number" helperText={getProductSerialHelperText()} data={mackSerialField} />
                </Grid>
                {productData ?
                    <React.Fragment>
                        <Grid item md={12}>
                            <Typography variant="h4" sx={{ ml: "35px", }}>Description</Typography>
                            <Box component="p" sx={{ ml: "35px", }} >{productData.product_description}</Box>
                        </Grid>

                        <Grid item md={5} sx={{ minHeight: "300px", }}>
                            {productData.options && productData.options.length ?
                                <ProductOptionsFields
                                    productOptions={productData.options} soldOptions={productData.sold_options} controlData={controlData} setControlData={setControlData} newControlData={newControlData} setNewControlData={setNewControlData} />
                                : ''}
                        </Grid>

                        <Grid container item md={7} justifyContent="center" alignItems="center" >
                            {productData.product_image ?
                                <Box component="img" sx={{ width: "400px", }} alt={productData.product_code} src={`${process.env.PUBLIC_URL}/images/products/` + productData.product_image} />
                                : ''
                            }
                        </Grid>

                        {productData.options && productData.options.length ?
                            <Grid item md={12}><Typography variant="h4" sx={{ ml: "35px", }}>TOTAL COST: {showTotalCost()}</Typography></Grid>
                            : ''}

                        <Grid container item md={12} justifyContent="flex-end" >
                            <ConfirmationDialog
                                buttonProps={{ variant: "contained", size: "large", style: popupButtonStyle }}
                                handleDialogClickYes={handleMakeSale}
                                buttonText="Confirm Sale"
                                dialogText={getConfirmationDialogText()}
                                dialogYesText="Confirm"
                                dialogNoText="Cancel"
                            />
                        </Grid>
                    </React.Fragment>
                    : ''}
            </Grid>
            <Grid item md={1} />
            <Grid item md={11}>
                {makeSaleError && <StyledSnackbar text={makeSaleError} severity="error" onClose={() => setMakeSaleError(false)} />}
                {makeSaleDone && <StyledSnackbar text={makeSaleDone} severity="success" onClose={() => setMakeSaleDone(false)} />}
            </Grid>
        </StyledMainGrid>

    );

}

