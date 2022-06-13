import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
}));

export default function LoadingSpinner() {

    const classes = useStyles();

    return (
        <div className={classes.root}><CircularProgress /></div>
    )
}