import AccountT from "@/features/account/types/AccountT";
import { ReactElement } from "react";
import { Checkbox, Stack, Typography } from "@mui/material";

type Props = AccountT & {
  balance: number;
};
export const Account: React.FC = ({ account }: Props): ReactElement => (
  <>
    <Stack direction="row">
      <Checkbox />
      <Typography>{account.accountNo}</Typography>
      <Typography>{account.name}</Typography>
      <Typography>{account.balance}</Typography>
    </Stack>
  </>
);
