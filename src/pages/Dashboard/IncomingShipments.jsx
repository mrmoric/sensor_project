import React, { useState, useEffect, useContext } from 'react';

import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


import { ajaxGetShipments, ajaxMarkShipmentRecieved } from '../../services/shipmentService';

import StyledTable from '../../components/StyledTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import StyledSnackbar from '../../components/StyledSnackbar';

import { AuthContext } from '../../context';

import { downloadFile } from '../../helpers';

export default function IncomingShipments(props) {

    const { inMemoryUser } = useContext(AuthContext);

    const [shipments, setShipments] = useState([]);

    const [downloadPdfError, setDownloadPdfError] = useState(false);

    useEffect(() => {

        let id = props && props.companyId ? props.companyId : '';

        ajaxGetShipments(id)
            .then(res => {

                const { data, } = res;
                setShipments(data);
            }).catch(() => {
                setShipments([]);
            });

    }, [props]);

    const handleRecievedShipment = (id) => {

        ajaxMarkShipmentRecieved(id)
            .then(res => {
                const { data, } = res;
                setShipments(data);
            }).catch(() => {
                setShipments([]);
            });
    };

    var columns = [
        {
            id: 'awb',
            value: 'AWB#',
            width: '20%',
        },
        {
            id: 'invoice',
            value: 'Invoice',
            width: '15%',
        },
        {
            id: 'packing_list',
            value: 'Packing List',
            width: '15%',
        },
        {
            id: 'dispatched_date',
            value: 'Date Dispatched',
            width: '20%',
        },
        {
            id: 'recieve_shipment',
            value: 'Recieve Shipment',
            width: '30%',
        },
    ];

    if (inMemoryUser.isAdmin()) {
        //recieve_shipment

        columns = columns.filter(item => { return (item.id !== 'recieve_shipment') });
    }


    const popupButtonStyle = {
        height: "30px",
        width: "100px",
        fontSize: "12px",
        marginRight: "10px",
    }

    const showItemHandle = (item, type) => {

        if (type === 'head') {
            return item.value;
        } else {

            if (item.id === 'recieve_shipment') {
                return (
                    <ConfirmationDialog id={item.row.id}
                        buttonProps={{ variant: "contained", style: popupButtonStyle }}
                        handleDialogClickYes={handleRecievedShipment}
                        buttonText="Recieve"
                        dialogText="Are you sure you wish to confirm receipt of this shipment and transfer goods to your inventory?"
                        dialogYesText="Yes"
                        dialogNoText="No" />
                );
            } else if (item.id === 'invoice' || item.id === 'packing_list') {
                return (
                    <IconButton onClick={() =>
                        downloadFile({
                            params: { id: item.row.id, fileType: item.id, role: inMemoryUser.getUserRole() },
                            fileName: item.row.awb + '_' + item.id,
                            fileExt: 'pdf',
                            onError: message => setDownloadPdfError(message)
                        })}>
                        < PictureAsPdfIcon />
                    </IconButton >
                );

            }

            else return item.value;
        }

    }

    return (
        <React.Fragment>
            <StyledTable tableLabel="Incoming Shipments" sx={{ maxWidth: "663px", }} TableColumns={columns} TableRows={shipments} showItem={showItemHandle} />
            {downloadPdfError && <StyledSnackbar text={downloadPdfError} severity="error" onClose={() => setDownloadPdfError(false)} />}
        </React.Fragment>
    );

}
