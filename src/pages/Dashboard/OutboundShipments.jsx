import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { ajaxGetAdminShipments } from '../../services/adminService';

import StyledTable from '../../components/StyledTable';
import StyledSnackbar from '../../components/StyledSnackbar';

import { downloadFile } from '../../helpers';

export default function OutboundShipments() {

    const [shipments, setShipments] = useState([]);

    const [downloadPdfError, setDownloadPdfError] = useState(false);

    useEffect(() => {

        ajaxGetAdminShipments()
            .then(res => {
                const { data, } = res;
                setShipments(data);
            }).catch(() => {
                setShipments([]);
            });

    }, []);


    const columns = [
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
            id: 'company',
            value: 'Distributor',
            width: '30%',
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
    ];


    const showItemHandle = (item, type) => {

        if (type === 'head') {
            return item.value;
        } else {

            if (item.id === 'invoice' || item.id === 'packing_list') {

                return (
                    <IconButton onClick={() =>
                        downloadFile({
                            params: { id: item.row.id, fileType: item.id, role: 'administrator' },
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
            <StyledTable tableLabel="Outbound Shipments" sx={{ maxWidth: "663px", }} TableColumns={columns} TableRows={shipments} showItem={showItemHandle} />
            {downloadPdfError && <StyledSnackbar text={downloadPdfError} severity="error" onClose={() => setDownloadPdfError(false)} />}
        </React.Fragment>
    );
}
