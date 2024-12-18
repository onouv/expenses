import AccountT from "@/features/accounts/types/AccountT";
import ExpenseT from "@/common/types/ExpenseT";

type AccountDetailsT = AccountT & {
  expenses: ExpenseT[];
};

export default AccountDetailsT;
