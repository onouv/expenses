package onosoft.usecases;

import onosoft.domain.model.Expense;

import java.util.List;

public interface ExpenseUpstreamPort {

    public void assignExpenseToAccount(Expense expense, String accountNo)
            throws NoSuchAccountException;
    public List<Expense> getExpenses(String accountNo);
}
