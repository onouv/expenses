package onosoft.ports.driven.expense;

import lombok.Getter;
import onosoft.domain.model.Expense;

@Getter
public abstract class ExpenseException extends RuntimeException {

    private final Expense expense;

    protected ExpenseException(Expense expense, String message) {
        super(String.format(
                "Expense of %s for purpose'%s' from %s: %s",
                expense.getAmount().toString(),
                expense.getPurpose(),
                expense.getAccruedDate().toString(),
                message));
        this.expense = expense;
    }
}
