"use client";

import React, { ReactElement } from "react";
import { WriteApiT } from "@/common/api/write-api";

import { Stack } from "@mui/material";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import ExpenseDetailsForm from "@/features/expenses/features/components/ExpenseDetailsForm";
import useUpdateExpenseApi from "@/features/expenses/features/update/api/useUpdateExpenseApi";
import ExpenseEntityT from "@/features/expenses/types/ExpenseEntityT";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import useGetAccountDetails from "@/common/api/useGetAccountDetails";
import config from "@/app-config.json";

type Props = {
  expense: ExpenseEntityT;
};
const UpdateExpenseForm = ({ expense }: Props): ReactElement => {
  const api: WriteApiT<ExpenseEntityT> = useUpdateExpenseApi();
  const { data, error, isLoading } = useGetAccountDetails(expense.accountNo);

  if (isLoading) {
    return <WaitingPrompt prompt="Loading data from server..." />;
  }

  if (error || data == undefined) {
    return (
      <ErrorPage
        prompt="Error while loading data from server."
        nextRoute={config.frontend.accounts.default}
      />
    );
  }
  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={data} />
      <ExpenseDetailsForm account={data} initialValues={expense} />
    </Stack>
  );
};

export default UpdateExpenseForm;
