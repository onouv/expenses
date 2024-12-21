import ExpenseT from "@/features/expenses/types/ExpenseT";

type ExpenseEntityT = ExpenseT & {
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
