import AccountT from "@/features/accounts/types/AccountT";
import { ReactElement } from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
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
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>Account</TableCell>
              <TableCell sx={{ borderBottom: "none" }}>Account Name</TableCell>
              <TableCell sx={{ borderBottom: "none" }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  </Paper>
);

export default AccountHeader;
