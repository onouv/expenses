"use client"


import ExpensePage from "@/features/expenses/components/ExpensePage";
import FeaturePage from "@/components/FeaturePage";
import {accountDetailsUrl} from "@/common/utils/account-routes";
import {useSearchParams} from "next/navigation";
import UpdateExpenseForm from "@/features/expenses/features/update/components/UpdateExpenseForm";

const UpdateExpensePage = () => {
    const params = useSearchParams();
    const expenseId = params.get("expenseid") as string;

    return (
      <ExpensePage form={(account) => (
          <FeaturePage
              title="Update Expense"
              backUrl={accountDetailsUrl(account.accountNo)}
          >
            <UpdateExpenseForm account={account}
          </FeaturePage>
      )}
    );
}