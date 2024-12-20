import PlannedExpenseT from "@/features/expenses/types/PlannedExpenseT";

type ExpenseEntityT = PlannedExpenseT & {
  expenseId: number;
  paymentActualDate: Date;
};

export default ExpenseEntityT;
