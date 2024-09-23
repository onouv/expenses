package onosoft.domain.model;

import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class Account {

    private String accountNo;

    @NotEmpty(message = "Account accountName is required")
    private String accountName;

    private String accountDescription;

    private ArrayList<Expense> expenses;

    public void assignExpense(Expense expense) {
        this.expenses.add(expense);
    }
}
