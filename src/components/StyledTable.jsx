import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.MuiTableCell-root`]: {
        border: "1px solid #000",
        fontWeight: "bold",
        padding: "8px 0 8px 8px",
        height: '40px',
    },
}));

const StyledTableHeadCell = styled(StyledTableCell)(({ theme }) => ({
    [`&.MuiTableCell-root`]: {
        padding: "0 0 8px 8px",
    },
}));

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
    [`&.MuiTableSortLabel-root`]: {
        width: '100%',
        minHeight: '35px',
        lineHeight: '1rem',
        overflow: 'hidden',
    },
    [`&.MuiTableSortLabel-root > .MuiBox-root`]: {
        position: 'absolute',
        top: '5px',
    },
    [`&.MuiTableSortLabel-root > svg`]: {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
    },
}));

const StyledSortIcon = styled(ArrowDropDownOutlinedIcon)(({ theme }) => ({
    [`&.MuiTableSortLabel-icon`]: {
        color: 'white !important',
        fontSize: '30px',
    },
}));

function EnhancedTableHead(props) {

    const { order, orderBy, onRequestSort, headCells, headStyles } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx={headStyles}>
            <TableRow>
                {headCells.map((item) => (
                    item.sort ?
                        <StyledTableHeadCell key={item.id} sx={{ width: item.width }} align='left' sortDirection={orderBy === item.id ? order : false}>
                            <StyledTableSortLabel
                                active={orderBy === item.id}
                                direction={orderBy === item.id ? order : 'asc'}
                                onClick={createSortHandler(item.id)}
                                IconComponent={StyledSortIcon}>
                                <Box sx={{ position: "relative", top: "5px" }}>
                                    {props.showItem(item, 'head')}
                                </Box>
                            </StyledTableSortLabel> </StyledTableHeadCell>
                        : <StyledTableHeadCell key={item.id} align='left' sx={{ width: item.width, position: "relative", }} >
                            <Box sx={{ position: "absolute", top: "2px" }}>
                                {props.showItem(item, 'head')}
                            </Box>
                        </StyledTableHeadCell>

                ))}
            </TableRow>
        </TableHead >
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    /*  orderBy: PropTypes.string.isRequired,*/
};

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


export default function StyledTable(props) {

    const tableHeadStyles = {};

    if (props.grey) {
        tableHeadStyles.backgroundColor = "#BEC0BF";
    }

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(props.orderBy);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const getTableRows = () => {

        let rows = [...props.TableRows];

        if (props.addLastRowEmpty) {
            let row = [...props.TableColumns];
            row.id = 0;
            rows.push(row);
        }

        return rows;
    }


    return (
        <React.Fragment>
            {props.tableLabel ?
                <Box>
                    <Typography variant="h4" >
                        {props.tableLabel}
                    </Typography>
                </Box>
                : ''}
            <TableContainer sx={props.sx} >
                <Table aria-label="customized table">
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headCells={props.TableColumns} showItem={props.showItem} headStyles={tableHeadStyles} />
                    <TableBody>
                        {stableSort(getTableRows(), getComparator(order, orderBy)).map((row) => (
                            <TableRow key={row.id}>
                                {props.TableColumns.map((item) => (
                                    <StyledTableCell key={item.id} align='center'>{props.showItem({ id: item.id, value: row[item.id], row: row }, 'body')} </StyledTableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </React.Fragment>

    );
}