package onosoft.ports.driving.account;

import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;

public interface AccountRepoPort  {
    Account loadAccount(String accountNo)
            throws NoSuchAccountException, AmountExceedsRangeException;
    void saveAccount(Account account);
    boolean accountExists(String accountNo);
}
