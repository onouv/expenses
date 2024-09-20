"use client";

import React from "react";
import { useState } from "react";
import AccountT, { defaultAccount } from "@/features/account/types/AccountT";
import FeaturePage from "@/components/FeaturePage";
import config from "@/app-config.json";
import CreateAccountForm from "@/features/account/features/create/components/CreateAccountForm";

const CreateAccountPage: React.FC = (): Element => {
  const [account, setAccount] = useState<AccountT>(defaultAccount);

  return (
    <FeaturePage title="Create Account" backUrl={config.ACCOUNT_PARTIAL_URL}>
      <CreateAccountForm />
    </FeaturePage>
  );
};

export default CreateAccountPage;
