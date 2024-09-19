"use client";

import { AccountT } from "./types/AccountT";
import React, { ReactElement } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import config from "@/app-config.json";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import FeaturePage from "@/components/FeaturePage";

type Props = {
  accounts: AccountT[];
};

const AccountsListing: React.FC = ({ accounts }: Props): ReactElement => (
  <FeaturePage title="Accounts Overview">
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>Account No</TableCell>

              <TableCell sx={{ borderBottom: "none" }}>Account Name</TableCell>

              <TableCell sx={{ borderBottom: "none" }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account: AccountT, index) => (
              <TableRow key={account.accountNo}>
                <Link
                  href={`${config.ACCOUNT_PARTIAL_URL}/${account.accountNo}`}
                >
                  <TableCell sx={{ borderBottom: "none" }}>
                    {account.accountNo}
                  </TableCell>

                  <TableCell sx={{ borderBottom: "none" }}>
                    {account.name}
                  </TableCell>

                  <TableCell sx={{ borderBottom: "none" }}>
                    {account.description}
                  </TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container padding={3} justifyContent="center" alignItems="center">
        <Grid item>
          <Link href={config.ACCOUNT_CREATE_PARTIAL_URL}>
            <Button>New Account</Button>
          </Link>
        </Grid>
      </Grid>
    </Stack>
  </FeaturePage>
);

/*
const AccountsListing: React.FC = ({ accounts }: Props): ReactElement => (
  <FeaturePage title="Accounts Overview">
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Grid container>
                <Grid item xs={2}>
                  <TableCell sx={{ borderBottom: "none" }}>
                    Account No
                  </TableCell>
                </Grid>
                <Grid item xs={4}>
                  <TableCell sx={{ borderBottom: "none" }}>
                    Account Name
                  </TableCell>
                </Grid>
                <Grid item xs={6}>
                  <TableCell sx={{ borderBottom: "none" }}>
                    Description
                  </TableCell>
                </Grid>
              </Grid>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account: AccountT, index) => (
              <TableRow key={account.accountNo}>
                <Link
                  href={`${config.ACCOUNT_PARTIAL_URL}/${account.accountNo}`}
                >
                  <Grid container>
                    <Grid item xs={2}>
                      <TableCell sx={{ borderBottom: "none" }}>
                        {account.accountNo}
                      </TableCell>
                    </Grid>
                    <Grid item xs={4}>
                      <TableCell sx={{ borderBottom: "none" }}>
                        {account.name}
                      </TableCell>
                    </Grid>
                    <Grid item xs={6}>
                      <TableCell sx={{ borderBottom: "none" }}>
                        {account.description}
                      </TableCell>
                    </Grid>
                  </Grid>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container padding={3} justifyContent="center" alignItems="center">
        <Grid item>
          <Link href={config.ACCOUNT_CREATE_PARTIAL_URL}>
            <Button>New Account</Button>
          </Link>
        </Grid>
      </Grid>
    </Stack>
  </FeaturePage>
);
*/
//<Divider sx={{ border: 1, opacity: 0.4 }} />
//<Divider />

export default AccountsListing;
