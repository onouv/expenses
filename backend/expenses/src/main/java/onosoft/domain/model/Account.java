package onosoft.domain.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Builder
public class Account {

    private String accountNo;

    @NotEmpty(message = "Account name is required")
    private String name;

    private String description;

    //private List<Expense> expenses;

    public void assignExpense(Expense expense) {

        //this.expenses.add(expense);
    }
}
