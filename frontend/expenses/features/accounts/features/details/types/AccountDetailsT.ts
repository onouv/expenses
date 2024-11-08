import ExpenseT from "@/features/accounts/types/Expense";
import AccountT from "@/features/accounts/types/AccountT";

type AccountDetailsT = AccountT & {
  expenses: ExpenseT[];
};

export default AccountDetailsT;
