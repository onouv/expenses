"use client";

import React, { ReactElement } from "react";
import { useSearchParams } from "next/navigation";
import useGetAccountDetails from "@/common/api/useGetAccountDetails";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import config from "@/app-config.json";
import FeaturePage from "@/components/FeaturePage";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";

type Props = {
  form: (account: AccountDetailsT) => ReactElement;
};
const ExpensePage = ({ form }: Props): ReactElement => {
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
      title="Assign Expense To Account"
      backUrl={`${config.frontend.accounts.details}?accountno=${data.accountNo}`}
    >
      {form(data)}
    </FeaturePage>
  );
};

export default ExpensePage;
