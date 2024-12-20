package onosoft.ports.driving.expense;

import onosoft.adapters.driving.expense.ExpenseJpaData;
import onosoft.ports.driven.expense.NoSuchExpenseException;

public interface ExpenseRepoPort  {
    ExpenseJpaData loadExpense(long expenseId) throws NoSuchExpenseException;
    void deleteExpense(long expenseId) throws NoSuchExpenseException;
}
