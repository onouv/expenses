"use client";

import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import { Stack } from "@mui/material";
import React, { ReactElement } from "react";
import RequestApiT from "@/common/api/RequestApiT";
import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import ExpenseDetailsForm from "@/features/expenses/features/components/ExpenseDetailsForm";

type Props = {
  account: AccountDetailsT;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  const api: RequestApiT<PlannedExpenseT> = useAssignExpenseApi();

  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={account} />
      <ExpenseDetailsForm account={account} api={api} />
    </Stack>
  );
};

export default AssignExpenseForm;
