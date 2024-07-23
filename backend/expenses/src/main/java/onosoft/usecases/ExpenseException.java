package onosoft.usecases;

import onosoft.domain.model.Expense;
import lombok.Getter;

@Getter
public class ExpenseException extends RuntimeException {

    private Expense expense;

    public ExpenseException(Expense expense, String message) {
        super(message);
        this.expense = expense;
    }

}
