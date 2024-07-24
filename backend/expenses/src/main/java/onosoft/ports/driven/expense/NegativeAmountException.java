package onosoft.ports.expense;

import onosoft.domain.model.Expense;
import onosoft.ports.expense.ExpenseException;


public class NegativeAmountException extends ExpenseException {

    public NegativeAmountException(Expense expense) {
        super(expense, String.format("Expense holds negative amount: %s", expense.toString()));
    }
}
