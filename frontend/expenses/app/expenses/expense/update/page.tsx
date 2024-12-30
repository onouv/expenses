"use client";

import FeaturePage from "@/components/FeaturePage";
import { accountDetailsUrl } from "@/common/utils/account-routes";
import { useSearchParams } from "next/navigation";
import UpdateExpenseForm from "@/features/expenses/features/update/components/UpdateExpenseForm";
import useGetExpenseApi from "@/features/expenses/features/update/api/useGetExpenseApi";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import React from "react";
import config from "@/app-config.json";

const UpdateExpensePage = () => {
  const params = useSearchParams();
  const expenseId = params.get("expenseid") as string;

  const { data, isSaving, error } = useGetExpenseApi(parseInt(expenseId));

  if (isSaving) {
    return <WaitingPrompt prompt="Loading expense from server..." />;
  }

  if (!data) {
    return <></>;
  }

  if (error) {
    return (
      <ErrorPage
        prompt="Error while loading expense from server."
        nextRoute={config.frontend.accounts.default}
      />
    );
  }

  return (
    <FeaturePage
      title="Update Expense"
      backUrl={accountDetailsUrl(data.accountNo)}
    >
      <UpdateExpenseForm expense={data} />
    </FeaturePage>
  );
};

export default UpdateExpensePage;
