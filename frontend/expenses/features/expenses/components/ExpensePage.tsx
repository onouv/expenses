"use client";

import React, { ReactElement } from "react";
import { useSearchParams } from "next/navigation";
import useGetAccountDetails from "@/common/api/useGetAccountDetails";
import WaitingPrompt from "@/components/WaitingPrompt";
import ErrorPage from "@/components/ErrorPage";
import config from "@/app-config.json";
import AccountT from "@/features/accounts/types/AccountT";

type Props = {
  form: (account: AccountT) => ReactElement;
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

  return form(data);
};

export default ExpensePage;
