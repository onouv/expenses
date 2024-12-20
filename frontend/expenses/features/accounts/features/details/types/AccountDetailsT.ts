import AccountT from "@/features/accounts/types/AccountT";
import ExpenseSummaryT from "@/common/types/ExpenseSummaryT";

type AccountDetailsT = AccountT & {
  expenses: ExpenseSummaryT[];
};

export default AccountDetailsT;
