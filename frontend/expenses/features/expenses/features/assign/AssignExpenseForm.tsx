"use client";

import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import { Stack } from "@mui/material";

type Props = {
  account: AccountDetailsT;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={account} />
    </Stack>
  );
};

export default AssignExpenseForm;
