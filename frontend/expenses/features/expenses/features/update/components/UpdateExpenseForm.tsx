import React, { ReactElement } from "react";
import WriteApiT from "@/common/api/WriteRequestApiT";

import { Stack } from "@mui/material";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import ExpenseDetailsForm from "@/features/expenses/features/components/ExpenseDetailsForm";
import useUpdateExpenseApi from "@/features/expenses/features/update/api/useUpdateExpenseApi";
import ExpenseEntityT from "@/features/expenses/types/ExpenseEntityT";
import AccountT from "@/features/accounts/types/AccountT";

type Props = {
  account: AccountT;
};
const UpdateExpenseForm = ({ account }: Props): ReactElement => {
  const api: WriteApiT<ExpenseEntityT> = useUpdateExpenseApi();

  const expense: ExpenseEntityT = account.return(
    <Stack spacing={2} padding={2}>
      <AccountHeader account={account} />
      <ExpenseDetailsForm account={account} api={api} />
    </Stack>,
  );
};

export default UpdateExpenseForm;
