package online.onosoft.usecases;

import online.onosoft.domain.model.Account;
import online.onosoft.domain.model.Expense;

import java.util.List;

public interface ExpenseUsecases {

    public void assignExpenseToAccount(Expense expense, String accountNo)
            throws NoSuchAccountException, PersistenceException;
    public List<Expense> getExpenses(String accountNo);
}
