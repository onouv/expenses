package onosoft.domain.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import onosoft.domain.exception.ExpensePreexistingException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@Builder
@ToString
public class Account {

    @NotEmpty(message = "Account accountName is required")
    private String accountNo;

    @NotEmpty(message = "Account accountName is required")
    private String accountName;

    private String accountDescription;

    @Builder.Default
    private List<Expense> expenses = new ArrayList<>();

    public Optional<Expense> getExpense(long expenseId) {
        for (Expense expense : expenses) {
            if (expense.getExpenseId() == expenseId) {
                return Optional.of(expense);
            }
        }

        return Optional.empty();
    }

    public void addExpense(Expense expense) throws ExpensePreexistingException {
        if (this.expenses.contains(expense)) {
            throw new ExpensePreexistingException(expense);
        }
        this.expenses.add(expense);
    }
}
