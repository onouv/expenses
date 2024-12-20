"use client";

import React, { ReactElement } from "react";
import AssignExpenseForm from "@/features/expenses/features/assign/components/AssignExpenseForm";
import FeaturePage from "@/common/components/FeaturePage";
import { accountDetailsUrl } from "@/common/utils/account-routes";
import { useSearchParams } from "next/navigation";
import useGetAccountDetails from "@/common/api/useGetAccountDetails";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import config from "@/app-config.json";

const AssignExpensePage = (): ReactElement => {
  const params = useSearchParams();
  const { data, error, isLoading } = useGetAccountDetails(
    params.get("accountno") as string,
  );

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
    <FeaturePage
      title="Assign Expense To Account"
      backUrl={accountDetailsUrl(data.accountNo)}
    >
      <AssignExpenseForm account={data} />
    </FeaturePage>
  );
};

export default AssignExpensePage;
