"use client";

import React, { ReactElement } from "react";
import AccountDetails from "@/features/accounts/features/details/components/AccountDetails";
import FeaturePage from "@/components/FeaturePage";
import config from "@/app-config.json";
import useGetAccountDetails from "@/features/accounts/features/details/api/useGetAccountDetails";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";

type Props = {
  params: Promise<{ accountNo: string }>;
};

const AccountDetailsPage = async ({ params }: Props) => {
  const { accountNo } = await params;
  const { data, error, isLoading } = useGetAccountDetails(accountNo);

  if (isLoading) {
    return <WaitingPrompt prompt="Loading data from server..." />;
  }

  if (error) {
    return (
      <ErrorPage
        prompt="Error while loading data from server."
        nextRoute={config.ACCOUNT_PARTIAL_URL}
      />
    );
  }

  if (data == undefined) {
    return <></>;
  }

  return (
    <FeaturePage title="Account Details" backUrl={config.ACCOUNT_PARTIAL_URL}>
      <AccountDetails account={data} />
    </FeaturePage>
  );
};

export default AccountDetailsPage;
