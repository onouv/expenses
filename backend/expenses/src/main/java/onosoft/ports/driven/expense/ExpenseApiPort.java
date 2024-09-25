package onosoft.ports.expense;

import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;

import java.util.List;

public interface ExpenseApiPort {

    void assignExpenseToAccount(String accountNo, String purpose)
            throws NoSuchAccountException;

    void assignExpenseToAccount(String accountNo, String purpose, double amount)
            throws NoSuchAccountException;
    List<Expense> getExpenses(String accountNo);
}
