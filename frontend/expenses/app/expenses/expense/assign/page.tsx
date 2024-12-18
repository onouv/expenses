"use client";

import React, { ReactElement } from "react";
import AssignExpenseForm from "@/features/expenses/features/assign/components/AssignExpenseForm";
import ExpensePage from "@/features/expenses/components/ExpensePage";

const AssignExpensePage = (): ReactElement => {
  return (
    <ExpensePage form={(account) => <AssignExpenseForm account={account} />} />
  );
};

export default AssignExpensePage;
