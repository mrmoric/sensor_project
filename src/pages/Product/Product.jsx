import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import FormControl from '@mui/material/FormControl';

import FormLabel from '@mui/material/FormLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';


import { useNavigate, useParams } from "react-router-dom";

import {
    ajaxGetAdminProducts, ajaxSaveAdminProduct, ajaxDisableAdminProduct, ajaxEnableAdminProduct,
    ajaxGetAdminProductOptions, ajaxDisableAdminProductOption, ajaxEnableAdminProductOption
} from '../../services/adminService';

import ProductOptions from './ProductOptions';
import ProductActions from './ProductActions';

import StyledMainGrid from '../../components/StyledMainGrid';



const StyledFormControl = styled(FormControl)(({ theme }) => ({
    [`&.MuiFormControl-root`]: {
        flexDirection: "row",
        alignItems: "center",
    },
    [`&.MuiFormControl-root > .MuiFormLabel-root`]: {
        width: "120px",
        textAlign: "right",
        marginRight: "20px",
    },
}));

export default function Product(props) {

    const incomingParams = useParams();

    const [product, setProduct] = useState(false);
    const [productOptions, setProductOptions] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {

        if (!props.add) {
            const params = {};

            if (incomingParams && incomingParams.ProductId) {

                params.ProductId = incomingParams.ProductId;
            }

            ajaxGetAdminProducts(params)
                .then(res => {
                    const { data, } = res;
                    setProduct(data);
                }).catch(() => {
                    setProduct(false);
                });
        }

    }, [incomingParams, props.add]);


    useEffect(() => {

        if (!props.add) {
            const params = {};

            if (incomingParams && incomingParams.ProductId) {

                params.ProductId = incomingParams.ProductId;
            }

            ajaxGetAdminProductOptions(params)
                .then(res => {
                    const { data, } = res;
                    setProductOptions(data);
                }).catch(() => {
                    setProductOptions(false);
                });
        }

    }, [incomingParams, props.add]);



    const handleProductFieldChange = event => {
        const value = event.target.value,
            key = event.target.name;

        let copyProduct = { ...product };
        copyProduct[key] = value;

        setProduct(copyProduct);

    }

    const getFieldValue = key => {
        return product ? product[key] : '';
    }

    const handleSaveProduct = () => {

        const params = { ...product };
        let url = "/dashboard/products";

        ajaxSaveAdminProduct(params)
            .then(res => {
                //const { data, } = res;
                //setProduct(data);

                navigate(url);
            }).catch(() => {
                //setProduct(false);
                navigate(url);
            });
    };

    const handleToggleProductOptionActive = (option, index) => {


        const params = { "id": option.id };
        let copyProductOptions = [...productOptions];

        if (option.active > 0) {
            ajaxDisableAdminProductOption(params)
                .then(res => {
                    //   const { data, } = res;

                    copyProductOptions[index].active = !copyProductOptions[index].active;
                    setProductOptions(copyProductOptions);


                }).catch(() => {


                });
        } else {
            ajaxEnableAdminProductOption(params)
                .then(res => {
                    //    const { data, } = res;

                    copyProductOptions[index].active = !copyProductOptions[index].active;
                    setProductOptions(copyProductOptions);


                }).catch(() => {


                });
        }


    };


    const handleProductDisable = () => {

        const params = { 'ProductId': product.id };

        ajaxDisableAdminProduct(params)
            .then(res => {
                const { data, } = res;
                setProduct(data);
            }).catch(() => {
                console.log('error while disabling admin product');
            });

    }

    const handleProductEnable = () => {

        const params = { 'ProductId': product.id };

        ajaxEnableAdminProduct(params)
            .then(res => {
                const { data, } = res;
                setProduct(data);
            }).catch(() => {
                console.log('error while enabling admin product');
            });

    }

    const handleProductOptionSave = () => {

        const params = { 'ProductId': product.id };

        ajaxGetAdminProductOptions(params)
            .then(res => {
                const { data, } = res;
                setProductOptions(data);
            }).catch(() => {
                setProductOptions(false);
            });

    }

    return (
        <StyledMainGrid container direction="row" rowSpacing={"20px"} sx={{ mt: "20px", }}>
            <Grid item lg={1} />
            <Grid item md={10} lg={11} >
                <StyledFormControl>
                    <FormLabel>Product Code:</FormLabel >
                    <OutlinedInput name="code" value={getFieldValue("code")} onChange={handleProductFieldChange} />
                </StyledFormControl>
            </Grid>

            <Grid item lg={1} />
            <Grid item md={10} lg={11} >
                <StyledFormControl>
                    <FormLabel>MSRP ($ USD):</FormLabel >
                    <OutlinedInput name="msrp" value={getFieldValue("msrp")} onChange={handleProductFieldChange} />
                </StyledFormControl>
            </Grid>

            <Grid item lg={1} />
            <Grid item md={10} lg={11} >
                <StyledFormControl>
                    <FormLabel>Description:</FormLabel >
                    <TextareaAutosize name="description" minRows={10} style={{ width: "400px", }} value={getFieldValue("description")} onChange={handleProductFieldChange} />
                </StyledFormControl>
            </Grid>

            <Grid item lg={1} />
            <Grid item md={10} lg={11} >
                {product && product.id && productOptions &&
                    <ProductOptions
                        productOptions={productOptions}
                        handleToggleActive={handleToggleProductOptionActive}
                        handleOptionSave={handleProductOptionSave}
                    />
                }
            </Grid>

            <Grid item lg={1} />
            <Grid item md={10} lg={11} >
                <ProductActions product={product}
                    handleSaveProduct={handleSaveProduct}
                    handleProductDisable={handleProductDisable}
                    handleProductEnable={handleProductEnable}
                    handleOptionSave={handleProductOptionSave}
                />
            </Grid>
        </StyledMainGrid >);

}