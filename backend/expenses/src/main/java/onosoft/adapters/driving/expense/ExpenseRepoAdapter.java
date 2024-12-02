package onosoft.adapters.driving.expense;

import jakarta.enterprise.context.ApplicationScoped;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.expense.ExpenseRepoPort;

@ApplicationScoped
public class ExpenseRepoAdapter implements ExpenseRepoPort {



    public Account loadAccount(String accountId) throws NoSuchAccountException {

    }

    public void saveAccount(Account account) {

    }

    public boolean accountExists(String accountId) {
        return false;
    }
}
