package onosoft.ports.driving.expense;

import onosoft.ports.driven.expense.NoSuchExpenseException;

public interface ExpenseRepoPort  {
    void deleteExpense(long expenseId) throws NoSuchExpenseException;
}
