package onosoft.domain.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import onosoft.domain.exception.ExpensePreexistingException;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@ToString
public class Account {

    @NotEmpty(message = "Account accountName is required")
    private String accountNo;

    @NotEmpty(message = "Account accountName is required")
    private String accountName;

    private String accountDescription;

    private List<Expense> expenses;

    public void addExpense(Expense expense) throws ExpensePreexistingException {
        if (this.expenses.contains(expense)) {
            throw new ExpensePreexistingException(expense);
        }
        this.expenses.add(expense);
    }
}
