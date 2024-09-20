package onosoft.domain.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Account {

    private String accountNo;

    @NotEmpty(message = "Account accountName is required")
    private String accountName;

    private String accountDescription;

    // private List<Expense> expenses;

    public void assignExpense(Expense expense) {

        // this.expenses.add(expense);
    }
}
