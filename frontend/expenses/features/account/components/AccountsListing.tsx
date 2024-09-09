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
import Grid from '@mui/material/Grid';
import config from '@/app-config.json';
import {Divider, Typography} from "@mui/material";
import Link from "next/link";



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
                 minWidth="85vh"
            >
                <Paper elevation={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: '95vh' }}>
                            <TableHead>
                                <TableRow>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <TableCell sx={{ borderBottom: "none" }}>Account No</TableCell>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TableCell sx={{ borderBottom: "none" }}>Account Name</TableCell>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TableCell sx={{ borderBottom: "none" }}>Description</TableCell>
                                        </Grid>
                                    </Grid>
                                </TableRow>
                                <Divider sx={{ border: 1, opacity: 0.4 }}/>
                            </TableHead>
                            <TableBody>
                                {accounts.map((account:AccountT, index) => (
                                    <TableRow key={account.accountNo}>
                                        <Link href={`${config.ACCOUNT_PARTIAL_URL}/${account.accountNo}`}>
                                            <Grid container>
                                                <Grid item xs={2}>
                                                    <TableCell sx={{ borderBottom: "none" }}>{account.accountNo}</TableCell>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TableCell sx={{ borderBottom: "none" }}>{account.name}</TableCell>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TableCell sx={{ borderBottom: "none" }}>{account.description}</TableCell>
                                                </Grid>
                                            </Grid>
                                            <Divider/>
                                        </Link>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
}

export default AccountsListing;