package onosoft.ports.driven.expense;

import onosoft.domain.model.Expense;

public class ExpensePreExistingException extends ExpenseException {

    public ExpensePreExistingException(Expense expense, String message) {
        super(expense, message);
    }
}
