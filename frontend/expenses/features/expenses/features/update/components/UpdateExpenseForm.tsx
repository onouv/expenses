"use client";

import React, { ReactElement, useEffect } from "react";

import { Stack } from "@mui/material";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import ExpenseDetailsForm from "@/features/expenses/features/components/ExpenseDetailsForm";
import useUpdateExpenseApi from "@/features/expenses/features/update/api/useUpdateExpenseApi";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import useGetAccountDetails from "@/common/api/useGetAccountDetails";
import config from "@/app-config.json";
import ExpenseFormDataT from "@/features/expenses/types/ExpenseFormDataT";
import { ExpenseEntity } from "@/features/expenses/types/ExpenseEntity";
import { accountDetailsUrl } from "@/common/utils/account-routes";
import { useRouter } from "next/navigation";

type Props = {
  expense: ExpenseEntity.Type;
};
const UpdateExpenseForm = ({ expense }: Props): ReactElement => {
  const updateApi = useUpdateExpenseApi();
  const getApi = useGetAccountDetails(expense.accountNo);
  const router = useRouter();

  const uploadExpense = async (formData: ExpenseFormDataT): Promise<void> => {
    const update: ExpenseEntity.Type = ExpenseEntity.of(formData, expense);
    await updateApi.requestCall(update);
  };

  useEffect(() => {
    if (updateApi.isSuccessful) {
      const route = accountDetailsUrl(expense.accountNo);
      router.push(route);
    }
  }, [updateApi.isSuccessful, router, expense.accountNo]);

  if (!getApi.data) {
    return <></>;
  }

  if (getApi.isLoading || updateApi.isSaving) {
    return <WaitingPrompt prompt="Loading data from server..." />;
  }

  if (getApi.error || updateApi.error) {
    return (
      <ErrorPage
        prompt="Error while calling server."
        nextRoute={config.frontend.accounts.default}
      />
    );
  }

  const formData: ExpenseFormDataT = {
    ...expense,
    amount: { ...expense.amount },
  } as const;

  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={getApi.data} />
      <ExpenseDetailsForm
        account={getApi.data}
        initialValues={formData}
        onSubmit={uploadExpense}
      />
    </Stack>
  );
};

export default UpdateExpenseForm;
