import { Account } from "@/features/accounts/types/Account";
import ExpenseSummaryT from "@/features/accounts/features/details/types/ExpenseSummaryT";

type AccountDetailsT = Account.Type & {
  expenses: ExpenseSummaryT[];
};

export default AccountDetailsT;
