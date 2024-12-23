"use client";

import React, { ReactElement } from "react";
import { useSearchParams } from "next/navigation";
import useGetAccountDetails from "@/features/accounts/features/details/api/useGetAccountDetails";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import config from "@/app-config.json";
import FeaturePage from "@/components/FeaturePage";
import AssignExpenseForm from "@/features/expenses/features/assign/components/AssignExpenseForm";

const ExpenseAssignPage = (): ReactElement => {
  const params = useSearchParams();
  const { data, error, isLoading } = useGetAccountDetails(
    params.get("accountno") as string,
  );

  if (isLoading) {
    return <WaitingPrompt prompt="Loading data from server..." />;
  }

  if (error) {
    return (
      <ErrorPage
        prompt="Error while loading data from server."
        nextRoute={config.frontend.accounts.default}
      />
    );
  }

  if (data == undefined) {
    return <></>;
  }

  return (
    <FeaturePage
      title="Assign Expense to Account"
      backUrl={`${config.frontend.accounts.details}?accountno=${data.accountNo}`}
    >
      <AssignExpenseForm account={data} />
    </FeaturePage>
  );
};

export default ExpenseAssignPage;
// <LocalizationProvider dateAdapter={AdapterDayjs}>
// </LocalizationProvider>
// <DummyForm />
// <AssignExpenseForm account={data} />
