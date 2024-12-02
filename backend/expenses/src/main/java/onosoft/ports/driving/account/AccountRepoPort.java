package onosoft.ports.driving.account;

import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;

import java.util.List;

public interface AccountRepoPort  {
    Account loadAccount(String accountNo)
            throws NoSuchAccountException;
    List<Account> loadAllAccounts();
    void saveAccount(Account account);
    void updateAccount(Account account);
    boolean accountExists(String accountNo);
}
