"use client";

import AccountHeader from "@/features/accounts/components/AccountHeader";
import { Stack } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import { ExpenseFormData } from "@/features/expenses/types/ExpenseFormData";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import ExpenseDetailsForm from "@/features/expenses/features/components/ExpenseDetailsForm";
import { Account } from "@/features/accounts/types/Account";
import { useRouter } from "next/navigation";
import { accountDetailsUrl } from "@/common/utils/account-routes";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import { Expense } from "@/features/expenses/types/Expense";

type Props = {
  account: Account.Type;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  const { requestCall, isSaving, isSuccessful, error } = useAssignExpenseApi();
  const router = useRouter();

  const uploadExpense = async (
    formData: ExpenseFormData.Type,
  ): Promise<void> => {
    const expense: Expense.Type = Expense.of(formData, account.accountNo);

    await requestCall(expense);
  };

  useEffect(() => {
    if (isSuccessful) {
      const route = accountDetailsUrl(account.accountNo);
      router.push(route);
    }
  }, [isSuccessful, router, account.accountNo]);

  if (error) {
    return (
      <ErrorPage
        prompt={error.message}
        nextRoute={accountDetailsUrl(account.accountNo)}
      />
    );
  }

  if (isSaving) {
    return <WaitingPrompt prompt="Saving data to server..." />;
  }

  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={account} />
      <ExpenseDetailsForm
        initialValues={ExpenseFormData.Defaults}
        account={account}
        onSubmit={uploadExpense}
      />
    </Stack>
  );
};

export default AssignExpenseForm;
