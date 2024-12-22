import { Expense } from "@/features/expenses/types/Expense";

type ExpenseEntityT = Expense.Type & {
  expenseId: number;
};

export default ExpenseEntityT;

/*
 a) Assign Expense
  [Nothing, AccountT]
  --> AssignExpenseForm
      --> [ExpenseFormData]
          --> ExpenseDetailsForm
      <--     [ExpenseT]
      --> [ExpenseDto.Type]
          --> Backend

 b) Account Details
  Backend
  --> [ExpenseSummaryT]
      --> AccountDetails

 c) Update Expense
  Backend
  --> [ExpenseEntityDto.Type]
      --> UpdateExpenseForm
          --> [ExpenseEntityT]
              --> [ExpenseFormData]
                  --> ExpenseDetailsForm
              <--     [ExpenseT]
              <-- [ExpenseEntityT]
  <--     [ExpenseEntityDto.Type]
 */
