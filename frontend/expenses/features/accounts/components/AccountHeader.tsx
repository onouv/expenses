"use client";

import AccountT from "@/features/accounts/types/AccountT";
import { ReactElement } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

type Props = {
  account: AccountT;
};
const AccountHeader = ({ account }: Props): ReactElement => (
  <Paper elevation={3}>
    <Stack spacing={2} padding={2}>
      <Typography variant="subtitle2">Account</Typography>
      <Box padding={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>Number</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>Name</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{account.accountNo}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{account.accountName}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography>{account.accountDescription}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  </Paper>
);

export default AccountHeader;
