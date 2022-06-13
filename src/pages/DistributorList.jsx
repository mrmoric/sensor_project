import React, { useEffect, useState } from 'react';

import { Link as RouterLink } from "react-router-dom";

import Link from '@mui/material/Link';

import Grid from '@mui/material/Grid';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';



import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { ajaxGetAdminDistributors } from '../services/adminService';

import StyledMainGrid from '../components/StyledMainGrid';
import StyledTable from '../components/StyledTable';
import { MoneyFormat } from '../components/MoneyFormat';
import StyledSnackbar from '../components/StyledSnackbar';
import { downloadFile } from '../helpers';

export default function DistributorList() {

    const columns = [
        {
            id: 'company_name',
            value: 'Company Name',
            sort: true,
            width: '10%',
        },
        {
            id: 'country',
            value: 'Country',
            sort: true,
            width: '10%',
        },
        {
            id: 'address',
            value: 'Address',
            sort: false,
            width: '10%',
        },
        {
            id: 'phone_number',
            value: 'Tel',
            sort: false,
            width: '10%',
        },
        {
            id: 'email',
            value: 'E-mail',
            sort: false,
            width: '5%',
        },

        {
            id: 'credit_limit',
            value: 'Credit Limit',
            sort: true,
            width: '15%',
        },
        {
            id: 'agreement',
            value: 'Distributor Agreement',
            sort: true,
            width: '15%',
        },
        {
            id: 'active',
            value: 'Disabled',
            sort: true,
            width: '15%',
        },
        {
            id: 'action',
            value: '',
            sort: false,
            width: '10%',
        },
    ];

    const [items, setItems] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const [downloadPdfError, setDownloadPdfError] = useState(false);

    const searchFilter = "company_name";


    const showItemHandle = (item, type) => {

        if (type === 'head') {
            return item.value;
        } else {

            if (item.row.id !== 0) {

                if (item.id === 'action') {

                    return (
                        <Link component={RouterLink} to={"/dashboard/distributors/edit/" + item.row.company_id} >
                            <EditOutlinedIcon />
                        </Link>

                    );
                }
                else if (item.id === 'active') {
                    return (item.value ? "no" : "yes");
                }
                else if (item.id === 'agreement') {

                    return (

                        <IconButton onClick={() =>
                            downloadFile({
                                params: { id: item.row.company_id, fileType: item.id, role: 'administrator' },
                                fileName: item.row.company_id + '_' + item.id,
                                fileExt: 'pdf',
                                onError: message => setDownloadPdfError(message)
                            })}>
                            < PictureAsPdfIcon />
                        </IconButton >
                    );
                }
                else if (item.id === 'credit_limit') {
                    return (<MoneyFormat prefix="US$ " value={item.value} />);
                }
                else return item.value;

            } else {
                if (item.id === 'action') {
                    return (
                        <Link component={RouterLink} to={"/dashboard/distributors/add"} >
                            <AddCircleOutlineIcon />
                        </Link>

                    );
                }
            }
        }

    }

    const searchChangeHandle = event => {
        const new_value = event.target.value.toLowerCase();
        setSearchTerm(new_value);
    }

    useEffect(() => {

        ajaxGetAdminDistributors({})
            .then(res => {
                const { data, } = res;
                setItems(data);
            }).catch(() => {
                setItems([]);
            });

    }, []);


    useEffect(() => {
        const results = items.filter(item =>
            (item[searchFilter] ? item[searchFilter] : '').toLowerCase().includes(searchTerm)
        );

        setSearchResults(results);

    }, [searchTerm, /*searchFilter,*/ items]);

    return (
        <StyledMainGrid container direction="row" rowSpacing={"22px"}>
            <Grid item lg={1} />
            <Grid item md={11} lg={11} sx={{ mt: "53px", }} >
                <FormControl sx={{ width: '400px', mb: "20px" }} variant="outlined">
                    <OutlinedInput id="search-input" type="text" placeholder='Search keyword' onChange={searchChangeHandle}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        } />
                </FormControl>
                <StyledTable grey addLastRowEmpty sx={{ maxWidth: "1300px", }} TableColumns={columns} TableRows={searchResults} showItem={showItemHandle} />
            </Grid>
            {downloadPdfError && <Grid item md={12}><StyledSnackbar text={downloadPdfError} severity="error" onClose={() => setDownloadPdfError(false)} /></Grid>}
        </StyledMainGrid >
    );
}