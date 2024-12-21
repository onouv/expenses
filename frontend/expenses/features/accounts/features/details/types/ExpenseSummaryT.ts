import ExpenseBaseT from "@/common/types/ExpenseBaseT";

type ExpenseSummaryT = ExpenseBaseT & {
  expenseId: number;
};

export default ExpenseSummaryT;
