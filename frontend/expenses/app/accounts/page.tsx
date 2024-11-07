"use client";

import React from "react";
import AccountsListing from "@/features/accounts/components/AccountsListing";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import useGetAccounts from "@/features/accounts/api/useGetAccounts";
import FeaturePage from "@/components/FeaturePage";

const AccountsPage = () => {
  const { data, error, isLoading } = useGetAccounts();

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

  return (
    <FeaturePage title="Accounts Overview">
      <AccountsListing accounts={data} />;
    </FeaturePage>
  );
};

export default AccountsPage;
