package onosoft.ports.driving.account;

import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;

import java.util.List;

public interface AccountRepoPort  {
    Account loadAccount(String accountNo)
            throws NoSuchAccountException, AmountExceedsRangeException;
    List<Account> loadAllAccounts() throws AmountExceedsRangeException;
    void saveAccount(Account account);
    void updateAccount(Account account) throws NoSuchAccountException;
    boolean accountExists(String accountNo);
}
