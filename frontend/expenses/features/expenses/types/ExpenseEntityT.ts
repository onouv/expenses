import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";

type ExpenseEntityT = PlannedExpenseT & {
  expenseId: number;
};

export default ExpenseEntityT;
