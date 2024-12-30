import { Expense } from "@/features/expenses/types/Expense";
import { ExpenseFormData } from "@/features/expenses/types/ExpenseFormData";

export namespace ExpenseEntity {
  export type Type = Expense.Type & {
    expenseId: number;
  };

  export const of = (
    formData: ExpenseFormData.Type,
    expense: ExpenseEntity.Type,
  ): Type => {
    return {
      ...formData,
      expenseId: expense.expenseId,
      accountNo: expense.accountNo,
      paymentStatus: expense.paymentStatus,
      paymentActualDate: expense.paymentActualDate,
    };
  };
}

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
