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
import config from '@/app-config.json';

import useSWR, { Fetcher } from 'swr'
import axios from "axios";
import {WaitingPrompt} from "@/components/WaitingPrompt";

const backendUrl = config.BACKEND_SERVICE_BASE_URL + config.BACKEND_ACCOUNT_PARTIAL_URL;
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const AccountsListing: React.FC = ({ accounts } : Array<AccountT> ): ReactElement => {
    const { data, error, isLoading } = useSWR(backendUrl, fetcher);

    if (isLoading) {
        return <WaitingPrompt prompt="Loading data from server..." />
    }


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
}

export default AccountsListing;