"use client";

import React from "react";
import AccountsListing from "@/features/accounts/components/AccountsListing";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import useGetAccountsApi from "@/features/accounts/api/useGetAccountsApi";
import FeaturePage from "@/components/FeaturePage";

const AccountsPage = () => {
  const { data, error, isLoading } = useGetAccountsApi();

  if (isLoading) {
    return <WaitingPrompt prompt="Loading data from server..." />;
  }

  if (error) {
    return (
      <ErrorPage
        prompt="Error while loading data from server."
        nextRoute={"/"}
      />
    );
  }

  if (data == undefined) {
    return null;
  }

  return (
    <FeaturePage title="Accounts Overview">
      <AccountsListing accounts={data} />
    </FeaturePage>
  );
};

export default AccountsPage;
