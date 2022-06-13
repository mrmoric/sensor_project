import React from 'react';


import { useNavigate } from "react-router-dom";


import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import useAlert from '../../hooks/useAlert';
import { ajaxAddAdminShipment } from '../../services/adminService';


import ConfirmationDialog from '../../components/ConfirmationDialog';
import StyledTable from '../../components/StyledTable';
import StyledMainGrid from '../../components/StyledMainGrid';


import AddShipmentFields from './AddShipmentFields';
import ShipmentItemDialog from './ShipmentItemDialog';



export default function AddShipment(props) {


    const columns = [
        {
            id: 'code',
            value: 'Product Code',
            sort: true,
            width: '20%',
        },
        {
            id: 'quantity',
            value: 'Quantity',
            sort: true,
            width: '10%',
        },
        {
            id: 'keys',
            value: 'CSV File with Keys',
            sort: true,
            width: '20%',
        },
        {
            id: 'action',
            value: '',
            sort: false,
            width: '5%',
        },
    ];

    const popupButtonStyle = {
        marginRight: "40px",
        height: "80px",
        width: "353px",
        fontSize: "24px",
    }

    const rowSpacing = "22px";

    const [shipmentProducts, setShipmentProducts] = React.useState([]);
    const [fields, setFields] = React.useState({});

    const navigate = useNavigate();

    const errorAlert = useAlert(false, 'error');

    const handleAddShippingProduct = e => {
        setShipmentProducts([...shipmentProducts, e]);

    }

    const handleDeleteShippingProduct = e => {

        setShipmentProducts([...shipmentProducts].filter(product => product.code !== e.row.code));

    }

    const getExludedProductCodes = () => {
        let excludedProductCodes = shipmentProducts.length ? [...shipmentProducts].map(product => product.code) : [];

        return excludedProductCodes;
    }

    const handleChangeShippingFields = (key, value) => {
        setFields({ ...fields, [key]: value })
    }

    const handleAddShipment = () => {

        if (!fields['company_id']) {
            errorAlert.setAlert('You have to choose a Company');
            return false;
        }

        if (!fields['awb']) {
            errorAlert.setAlert('You have to set AWB');
            return false;
        }

        if (!fields['tracking_hyperlink']) {
            errorAlert.setAlert('You have to set the Tracking hyperlink');
            return false;
        }

        if (!fields['file_invoice']) {
            errorAlert.setAlert('You have to upload Invoice');
            return false;
        }

        if (!fields['file_packing_list']) {
            errorAlert.setAlert('Upload Packing List');
            return false;
        }

        if (shipmentProducts.length < 1) {
            errorAlert.setAlert('You have to add at least one product to the shipment');
            return false;
        }

        const params = { ...fields, 'products': shipmentProducts };

        ajaxAddAdminShipment(params)
            .then(res => {
        
                if (res.error) {
                    errorAlert.setAlert(res.error);     
                } else {
                    setShipmentProducts([]);
                    setFields({});
                    navigate("/dashboard");
                }     

            })
            .catch((e) => {
                errorAlert.setAlert(e.message);  
            });
    }

    const showItemHandle = (item, type) => {

        if (type === 'head') {
            return item.value;
        } else {
            if (item.row.id !== 0) {

                if (item.id === 'action') {
                    return (
                        <IconButton onClick={() => handleDeleteShippingProduct(item)}>
                            <DeleteIcon />
                        </IconButton>

                    );
                }
                if (item.id === 'keys') {

                    return (
                        <React.Fragment>
                            {item.value ? <CheckCircleIcon /> : ''}
                        </React.Fragment>
                    );
                }
                else return item.value;

            } else {
                if (item.id === 'action') {
                    return (
                        <ShipmentItemDialog
                            dialogText="Add a new product to the shipment"
                            dialogYesText="Add"
                            excludedProductCodes={getExludedProductCodes()}
                            dialogNoText="Cancel"
                            handleDialogClickYes={handleAddShippingProduct} />
                    );
                }
            }
        }

    }



    return (
        <StyledMainGrid container direction="row" rowSpacing={rowSpacing} >
            <Grid item lg={1} />
            <Grid item container md={11} lg={11} sx={{ mt: "53px", mb: "11px", }} rowSpacing={rowSpacing}  >
                <AddShipmentFields handleChange={handleChangeShippingFields} fields={fields} />
            </Grid>


            <Grid item lg={1} />
            <Grid item md={11} lg={11} >
                <Box sx={{ width: "663px", }} >
                    {errorAlert.showAlert()}
                </Box>

            </Grid>

            <Grid item lg={1} /><Grid item md={11} lg={11}>
                <Typography variant="h5" sx={{ mb: "10px", }}>What products to include to the shipment?</Typography>
            </Grid>

            <Grid item lg={1} />
            <Grid item container md={11} lg={11} rowSpacing={rowSpacing} >
                <StyledTable grey addLastRowEmpty sx={{ maxWidth: "663px", }} TableColumns={columns} TableRows={shipmentProducts} showItem={showItemHandle} />
            </Grid>




            <Grid item lg={1} />
            <Grid item md={11} lg={11} >
                <ConfirmationDialog
                    buttonProps={{ variant: "contained", size: "large", style: popupButtonStyle }}
                    handleDialogClickYes={handleAddShipment}
                    buttonText="Add Shipment"
                    dialogText="Once the shipment is added it will appear in the distributor account."
                    dialogYesText="Confirm"
                    dialogNoText="Cancel"
                />
            </Grid>

        </StyledMainGrid >
    );
}

