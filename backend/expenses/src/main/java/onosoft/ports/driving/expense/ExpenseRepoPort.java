package onosoft.ports.driving.expense;

import onosoft.ports.driven.expense.NoSuchExpenseException;

public interface ExpenseRepoPort  {
    boolean expenseExists(long expenseId);
    void deleteExpense(long expenseId) throws NoSuchExpenseException;
}
