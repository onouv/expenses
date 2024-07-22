package online.onosoft.usecases;

import online.onosoft.domain.model.Expense;


public class NegativeAmountException extends ExpenseException {

    public NegativeAmountException(Expense expense) {
        super(expense, String.format("Expense holds negative amount: %s", expense.toString()));
    }
}
