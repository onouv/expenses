"use client";

import React, { ReactElement } from "react";
import { useState } from "react";
import AccountT, { defaultAccount } from "@/features/accounts/types/AccountT";
import FeaturePage from "@/components/FeaturePage";
import CreateAccountForm from "@/features/accounts/features/create/components/CreateAccountForm";
import config from "@/app-config.json";

const CreateAccountPage = (): ReactElement => {
  const [account, setAccount] = useState<AccountT>(defaultAccount);

  return (
    <FeaturePage title="Create Account" backUrl={config.ACCOUNTS_PARTIAL_URL}>
      <CreateAccountForm />
    </FeaturePage>
  );
};

export default CreateAccountPage;
