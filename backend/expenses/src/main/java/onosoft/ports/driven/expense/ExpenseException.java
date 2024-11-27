package onosoft.ports.driven.expense;

import lombok.Getter;

@Getter
public abstract class ExpenseException extends RuntimeException {

    private final long expenseId;

    protected ExpenseException(long expenseId, String message) {
        super(String.format("Expense %s: %s", expenseId, message));
        this.expenseId = expenseId;
    }
}
