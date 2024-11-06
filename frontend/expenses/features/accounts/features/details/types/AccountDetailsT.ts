import ExpenseT from "@/features/accounts/types/Expense";

type AccountDetailsT = {
  accountNo: string;
  accountName: string;
  accountDescription: string;
  expenses: ExpenseT[];
};

export default AccountDetailsT;
