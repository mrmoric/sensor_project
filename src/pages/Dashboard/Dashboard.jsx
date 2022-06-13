import React, { useContext, useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import AvailbleCredit from './AvailbleCredit';
import MonthlySales from './MonthlySales';
import Payments from './Payments';
import IncomingShipments from './IncomingShipments';
import AdminButtons from './AdminButtons';
import AdminDistributorAutocomplete from '../../components/AdminDistributorAutocomplete';
import StyledMainGrid from '../../components/StyledMainGrid';
import { AuthContext } from '../../context';
import { ajaxGetCompanyInfo } from '../../services/companyService';

export default function Dashboard() {

    const { inMemoryUser } = useContext(AuthContext);
    const [companyId, setCompanyId] = React.useState('');
    const hello_message = !inMemoryUser.isAdmin() ? inMemoryUser.getUsername() : '';
    const [companyInfo, setCompanyInfo] = useState(false);
    const [needCompanyInfoReload, setNeedCompanyInfoReload] = useState(false);

    useEffect(() => {

        let data = [];

        if (companyId) {
            data.companyId = companyId;
        }

        if (!inMemoryUser.isAdmin() || (inMemoryUser.isAdmin() && companyId)) {
            ajaxGetCompanyInfo(data)
                .then(res => {
                    const { data, } = res;
                    setCompanyInfo(data);
                }).catch(() => {
                    setCompanyInfo(false);
                });
        }

    }, [companyId, inMemoryUser]);


    useEffect(() => {

        if (needCompanyInfoReload) {

            let data = [];

            if (companyId) {
                data.companyId = companyId;
            }

            if (!inMemoryUser.isAdmin() || (inMemoryUser.isAdmin() && companyId)) {
                ajaxGetCompanyInfo(data)
                    .then(res => {
                        const { data, } = res;
                        setCompanyInfo(data);
                        setNeedCompanyInfoReload(false);
                    }).catch(() => {
                        setCompanyInfo(false);
                        setNeedCompanyInfoReload(false);
                    });
            }

        }
    }, [needCompanyInfoReload, companyId, inMemoryUser]);

    const handleCompanySearch = companyId => {
        setCompanyInfo(false);
        setCompanyId(companyId);
    }

    const handleCompanyUpdate = () => {
        setNeedCompanyInfoReload(true);
    }

    return (
        <StyledMainGrid container direction="row" rowSpacing={"22px"}>
            <Grid item lg={1} />
            <Grid item md={11} lg={11} sx={{ mt: "53px", mb: "11px" }} >
                {!inMemoryUser.isAdmin() ?
                    <Typography variant="h4" >
                        Welcome Back {hello_message}!
                    </Typography>
                    : <AdminDistributorAutocomplete setSearchResult={handleCompanySearch} sx={{ width: "440px", }} />}
            </Grid>

            {companyInfo && !needCompanyInfoReload &&
                <React.Fragment>
                    <Grid item lg={1} />
                    <Grid item sm={11} md={4} lg={4} rowSpacing={"44px"} style={{ minWidth: "265px" }} >
                        <AvailbleCredit companyInfo={companyInfo} />
                    </Grid>
                    <Grid item sm={11} md={7} lg={7} style={{ minWidth: "580px" }} >
                        <MonthlySales companyId={companyId} />
                    </Grid>

                    <Grid item lg={1} />
                    <Grid item sm={11} md={5} lg={5} style={{ minWidth: "265px" }} >
                        <Payments companyInfo={companyInfo} />
                        {inMemoryUser.isAdmin() && companyId && <AdminButtons companyId={companyId} handleCompanyUpdate={handleCompanyUpdate} />}
                    </Grid>
                    <Grid item sm={11} md={6} lg={6} style={{ minWidth: "664px" }} >
                        <IncomingShipments companyId={companyId} />
                    </Grid>
                </React.Fragment>
            }
        </StyledMainGrid >
    );
}

