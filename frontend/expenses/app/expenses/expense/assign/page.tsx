"use client";

import React, { ReactElement } from "react";
import AssignExpenseForm from "@/features/expenses/features/assign/components/AssignExpenseForm";
import ExpensePage from "@/features/expenses/components/ExpensePage";
import FeaturePage from "@/common/components/FeaturePage";
import { accountDetailsUrl } from "@/common/utils/account-routes";

const AssignExpensePage = (): ReactElement => {
  return (
    <ExpensePage
      form={(account) => (
        <FeaturePage
          title="Assign Expense To Account"
          backUrl={accountDetailsUrl(account.accountNo)}
        >
          <AssignExpenseForm account={account} />
        </FeaturePage>
      )}
    />
  );
};

export default AssignExpensePage;
