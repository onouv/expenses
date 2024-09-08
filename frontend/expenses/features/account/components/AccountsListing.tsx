'use client'

import {AccountT} from "./types/AccountT";
import React, {ReactElement} from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const getRowId = (account: AccountT): string => account.accountNo;

const columns = [
    {
        field: 'accountNo',
        headerName: 'Account Number',
        width: 150,
        editable: false,
        sortable: true
    },
    {
        field: 'name',
        headerName: 'Account Name',
        width: 300,
        editable: false,
        sortable: false
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 500,
        editable: false,
        sortable: false
    }
];

type Props = {
    accounts: AccountT[];
}
const AccountsListing: React.FC = ({ accounts }: Props ): ReactElement => {

    return (
        <>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center"
                 minHeight="100vh"
            >
                <Paper elevation={3}>
                    <DataGrid
                        rows={accounts}
                        columns={columns}
                        getRowId={getRowId}

                        pageSizeOptions={[5]}

                        disableRowSelectionOnClick
                    />
                </Paper>
            </Box>
        </>
    );
}

export default AccountsListing;