"use client";

import { AccountT } from "./types/AccountT";
import React, { ReactElement } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import config from "@/app-config.json";
import { Button, Stack } from "@mui/material";
import FeaturePage from "@/components/FeaturePage";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  accounts: AccountT[];
};

const AccountsListing: React.FC = ({ accounts }: Props): ReactElement => {
  const router = useRouter();
  return (
    <FeaturePage title="Accounts Overview">
      <Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>Account No</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  Account Name
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account: AccountT, index) => (
                <TableRow
                  onClick={() => {
                    router.push(
                      `${config.ACCOUNT_PARTIAL_URL}/${account.accountNo}`,
                    );
                  }}
                  key={account.accountNo}
                >
                  <TableCell sx={{ borderBottom: "none" }}>
                    {account.accountNo}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {account.accountName}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {account.accountDescription}
                  </TableCell>
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
};

export default AccountsListing;
