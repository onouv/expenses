package onosoft.ports.driven.expense;

import lombok.Getter;
import onosoft.domain.model.Expense;

@Getter
public class ExpenseException extends RuntimeException {

    private final Expense expense;

    public ExpenseException(Expense expense, String message) {
        super(String.format(
                "Expense of %s for purpose'%s' from %s: %s",
                expense.getAmount().toString(),
                expense.getPurpose(),
                expense.getAccrued().toString(),
                message));
        this.expense = expense;
    }
}
