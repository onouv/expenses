import AccountT from "@/features/accounts/types/AccountT";
import { ReactElement } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

type Props = {
  account: AccountT;
};
const AccountHeader = ({ account }: Props): ReactElement => (
  <Stack>
    <Grid container padding={2} spacing={2}>
      <Grid item xs={4}>
        <Typography variant="button">Account</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="button">Account Name</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="button">Description</Typography>
      </Grid>
    </Grid>
    <Divider />
    <Grid container padding={2} spacing={2}>
      <Grid item xs={4}>
        <Typography>{account.accountNo}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{account.accountName}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{account.accountDescription}</Typography>
      </Grid>
    </Grid>
  </Stack>
);

export default AccountHeader;
