import { ReactElement } from "react";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import ExpensesListing from "@/features/expenses/components/ExpensesListing";

type Props = {
  account: AccountDetailsT;
};
const AccountDetails = ({ account }: Props): ReactElement => {
  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={account} />
      <ExpensesListing expenses={account.expenses} />
    </Stack>
  );
};

export default AccountDetails;
