"use client";

import React, { ReactElement } from "react";
import { useState } from "react";
import { Account } from "@/features/accounts/types/Account";
import FeaturePage from "@/components/FeaturePage";
import CreateAccountForm from "@/features/accounts/features/create/components/CreateAccountForm";
import config from "@/app-config.json";

const CreateAccountPage = (): ReactElement => {
  const [account, setAccount] = useState<Account.Type>(Account.Defaults);

  return (
    <FeaturePage
      title="Create Account"
      backUrl={config.frontend.accounts.default}
    >
      <CreateAccountForm />
    </FeaturePage>
  );
};

export default CreateAccountPage;
