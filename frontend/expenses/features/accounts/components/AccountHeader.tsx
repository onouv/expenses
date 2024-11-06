import AccountT from "@/features/accounts/types/AccountT";
import { ReactElement } from "react";
import { Checkbox, Stack, Typography } from "@mui/material";

type Props = {
  account: AccountT;
};
const AccountHeader = ({ account }: Props): ReactElement => (
  <>
    <Stack direction="row">
      <Checkbox />
      <Typography>{account.accountNo}</Typography>
      <Typography>{account.accountName}</Typography>
      <Typography>{account.accountDescription}</Typography>
    </Stack>
  </>
);

export default AccountHeader;
