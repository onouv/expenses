"use client";

import AccountHeader from "@/features/accounts/components/AccountHeader";
import { Stack } from "@mui/material";
import React, { ReactElement } from "react";
import WriteApiT from "@/common/api/WriteRequestApiT";
import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import ExpenseDetailsForm from "@/features/expenses/features/components/ExpenseDetailsForm";
import AccountT from "@/features/accounts/types/AccountT";

type Props = {
  account: AccountT;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  const api: WriteApiT<PlannedExpenseT> = useAssignExpenseApi();

  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={account} />
      <ExpenseDetailsForm account={account} api={api} />
    </Stack>
  );
};

export default AssignExpenseForm;
