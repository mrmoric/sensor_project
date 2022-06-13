import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { ajaxGetInventory } from '../../services/inventoryService';


import InventorySearch from './InventorySearch';
import InventorySearchDate from './InventorySearchDate';
import InventoryFooter from './InventoryFooter';

import StyledMainGrid from '../../components/StyledMainGrid';
import StyledTable from '../../components/StyledTable';
import { MoneyFormat } from '../../components/MoneyFormat';

import { AuthContext } from '../../context';

const searchFilters = [
    /*
    {
        value: 'serial_number',
        label: 'Serial Number',
    },
    {
        value: 'mac',
        label: 'MAC ID',
    },
*/
    {
        value: 'serial_key',
        label: 'Serial Key',
    },

    {
        value: 'product_code',
        label: 'Product Code',
    },
];

const makeButtonStyle = {
    height: "30px",
    width: "100px",
    fontSize: "12px",
    marginRight: "10px",
}

export default function Inventory(props) {

    const { inMemoryUser } = useContext(AuthContext);

    var columns = [
        {
            id: 'product_code',
            value: 'Product Code',
            sort: true,
            width: '14%',
        },
        {
            id: 'serial_key',
            value: 'Serial Key',
            sort: true,
            width: '20%',
        },
        {
            id: 'dispatched_date',
            value: 'Dispatched to warehouse',
            sort: true,
            width: '14%',
        },
        {
            id: 'recieved_date',
            value: 'Recieved in warehouse',
            sort: true,
            width: '14%',
        },
        {
            id: 'msrp',
            value: 'MSRP',
            sort: true,
            width: '14%',
        },
        {
            id: 'action',
            value: 'Action',
            sort: false,
            width: '24%',
        },
    ];

    const navigate = useNavigate();

    const handleMakeSale = (id_or_serial) => {
        let url = "/dashboard/make-sale/" + encodeURIComponent(id_or_serial);
        navigate(url);
    }

    const showItemHandle = (item, type) => {

        if (type === 'head') {
            return item.value;
        } else {
      
            if (item.id === 'msrp') {
                return (<MoneyFormat prefix="US$ " value={item.value} />);
            } else if (item.id === 'action') {

                // let mac_or_serial = item.row.serial_number ? item.row.serial_number : item.row.mac;
                let mac_or_serial = item.row.serial_key;
                return (
                    <React.Fragment>

                        <Button variant="contained" size="normal" style={makeButtonStyle} onClick={() => handleMakeSale(mac_or_serial)}>Make Sale</Button>
                    </React.Fragment>

                );
            } else {
                return item.value;
            }
        }

    }

    if (props.sold === true) {
        columns = columns.map(function (item) {
            return item.id === 'dispatched_date' ? {
                id: 'sold_date',
                value: 'Date Sold',
            } : item;
        });
    }


    //Admin can't make sales
    if (inMemoryUser.isAdmin()) {
        columns = columns.filter(function (item) {
            return item.id !== 'action'
        });
    }



    const marginLeft = '100px';
    const tableWidth = '970px';

    const orderBy = "product_code";

    const [items, setItems] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchFilter, setSearchFilter] = useState("product_code");
    const [searchResults, setSearchResults] = useState([]);

    const incomingParams = useParams();


    useEffect(() => {

        const params = {
            'isSoldMode': props.sold,
        };

        if (incomingParams && incomingParams.CompanyId) {

            params.companyId = incomingParams.CompanyId;
        }

        ajaxGetInventory(params)
            .then(res => {
                const { data, } = res;
                setItems(data);
            }).catch(() => {
                setItems([]);
            });

    }, [props.sold, incomingParams]);

    useEffect(() => {
        const results = items.filter(item =>
            (item[searchFilter] ? item[searchFilter] : '').toLowerCase().includes(searchTerm)
        );

        setSearchResults(results);

    }, [searchTerm, searchFilter, items]);

    return (

        <StyledMainGrid container direction="row" rowSpacing="0" sx={{ height: "100%" }}>

            <Grid md={12} item>

                <InventorySearch marginLeft={marginLeft} tableWidth={tableWidth} setSearchTerm={setSearchTerm} setSearchFilter={setSearchFilter} searchFilters={searchFilters} searchFilter={searchFilter} />

                <InventorySearchDate marginLeft={marginLeft} tableWidth={tableWidth} />

                <StyledTable sx={{ maxWidth: tableWidth, display: 'flex', marginTop: '30px', marginLeft: marginLeft, }} TableColumns={columns} TableRows={searchResults} showItem={showItemHandle} orderBy={orderBy} grey />
            </Grid>

            <Grid md={12} item sx={{ alignSelf: "self-end", }}>

                <InventoryFooter marginLeft={marginLeft} items={searchResults} sold={props.sold} />

            </Grid>

        </StyledMainGrid >

    );
}

