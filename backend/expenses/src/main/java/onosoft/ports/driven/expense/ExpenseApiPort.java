package onosoft.ports.driven.expense;

import onosoft.commons.money.Money;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;

import java.util.List;

public interface ExpenseApiPort {

    void assignExpenseToAccount(String accountNo, String purpose, Money value)
            throws NoSuchAccountException;
    List<Expense> getExpenses(String accountNo);
}
