"use client";

import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import { Stack } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpenseDetailsForm from "@/features/expenses/features/components/ExpenseDetailsForm";

type Props = {
  account: AccountDetailsT;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} padding={2}>
        <AccountHeader account={account} />
        <ExpenseDetailsForm account={account} />
      </Stack>
    </LocalizationProvider>
  );
};

export default AssignExpenseForm;
