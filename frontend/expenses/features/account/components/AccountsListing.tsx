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
import {Button, Divider, Stack, Typography} from "@mui/material";
import Link from "next/link";



type Props = {
    accounts: AccountT[];
}
const AccountsListing: React.FC = ({ accounts }: Props ): ReactElement => {

    return (
        <Stack spacing={2} padding={2}>
            <Paper elevation={3}>
                <Box padding={2}>
                    <Typography variant="h6">
                        Accounts Overview
                    </Typography>
                </Box>
            </Paper>
            <Paper elevation={3}>
            <Stack>
                <TableContainer>
                    <Table >
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
                <Grid container padding={3} justifyContent="center" alignItems="center">
                    <Grid item>
                        <Link href={config.ACCOUNT_CREATE_PARTIAL_URL}>
                            <Button>
                                New Account
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Stack>
            </Paper>
        </Stack>
    );
}

export default AccountsListing;