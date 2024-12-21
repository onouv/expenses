import AccountT from "@/features/accounts/types/AccountT";
import ExpenseSummaryT from "@/features/accounts/features/details/types/ExpenseSummaryT";

type AccountDetailsT = AccountT & {
  expenses: ExpenseSummaryT[];
};

export default AccountDetailsT;
