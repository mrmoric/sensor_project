import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const StyledGrid = styled(Grid)(({ theme }) => ({
    width: 'calc(100% - ' + theme.components.MuiDrawer.styleOverrides.root['& .MuiToolbar-root'].width + ')',
}));

export default function StyledMainGrid(props) {
    return (<StyledGrid {...props} />)
}
