"use client";

import React from "react";
import AccountsListing from "@/features/accounts/components/AccountsListing";
import { WaitingPrompt } from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import useGetAccounts from "@/features/accounts/api/useGetAccounts";

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

  return <AccountsListing accounts={data} />;
};

export default AccountsPage;
