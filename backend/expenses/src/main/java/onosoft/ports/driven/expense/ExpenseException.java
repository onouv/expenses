package onosoft.ports.driven.expense;

import lombok.Getter;
import onosoft.domain.model.Expense;

@Getter
public class ExpenseException extends RuntimeException {

    private final Expense expense;

    public ExpenseException(Expense expense, String message) {
        super(message);
        this.expense = expense;
    }
}
