package online.onosoft.usecases;

import lombok.Getter;
import online.onosoft.domain.model.Expense;

@Getter
public class ExpenseException extends RuntimeException {

    private Expense expense;

    public ExpenseException(Expense expense, String message) {
        super(message);
        this.expense = expense;
    }

}
