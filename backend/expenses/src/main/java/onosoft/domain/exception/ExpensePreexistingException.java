package onosoft.domain.exception;

import onosoft.domain.model.Expense;
import onosoft.ports.driven.expense.ExpenseException;

public class ExpensePreexistingException extends ExpenseException {
    public ExpensePreexistingException(Expense expense) {
        super(expense, "Already exists.");
    }
}
