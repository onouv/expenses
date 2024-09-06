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


const AccountsListing: React.FC = ({ accounts } : Array<AccountT> ): ReactElement => {



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