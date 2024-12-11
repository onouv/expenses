"use client";

import React, { ReactElement } from "react";
import AccountDetails from "@/features/accounts/features/details/components/AccountDetails";
import FeaturePage from "@/components/FeaturePage";
import config from "@/app-config.json";
import useGetAccountDetails from "@/features/accounts/features/details/api/useGetAccountDetails";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import { useSearchParams } from "next/navigation";

const AccountDetailsPage = () => {
  const params = useSearchParams();
  const accountNo = params.get("accountno") as string;
  const { data, error, isLoading } = useGetAccountDetails(accountNo);

  if (isLoading) {
    return <WaitingPrompt prompt="Loading data from server..." />;
  }

  if (error) {
    return (
      <ErrorPage
        prompt="Cannot load account data."
        nextRoute={config.frontend.accounts.default}
      />
    );
  }

  if (data == undefined) {
    return <></>;
  }

  return (
    <FeaturePage
      title="Account Details"
      backUrl={config.frontend.accounts.default}
    >
      <AccountDetails account={data} />
    </FeaturePage>
  );
};

export default AccountDetailsPage;
