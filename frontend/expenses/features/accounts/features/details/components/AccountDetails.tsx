import { ReactElement } from "react";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import AccountHeader from "@/features/accounts/components/AccountHeader";

type Props = {
  account: AccountDetailsT;
};
const AccountDetails = ({ account }: Props): ReactElement => {
  return (
    <Stack>
      <AccountHeader account={account} />
    </Stack>
  );
};

export default AccountDetails;
