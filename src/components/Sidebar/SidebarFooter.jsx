import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import StyledSnackbar from '../../components/StyledSnackbar';
import { downloadFile } from '../../helpers';

export default function SidebarFooter() {

    const [downloadPdfError, setDownloadPdfError] = useState(false);

    return (
        <Box sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'flex-end',
            flexDirection: 'column'

        }}>
            <Button onClick={() => downloadFile({
                params: { id: 1, fileType: 'agreement', role: 'distributor' },
                fileName: 'invoice_new_test',
                fileExt: 'pdf',
                onError: message => setDownloadPdfError(message)
            })}
                color="inherit">Download Distributor Agreement</Button>
            {downloadPdfError && <StyledSnackbar text={downloadPdfError} severity="error" onClose={() => setDownloadPdfError(false)} />}
        </Box>
    );
}
