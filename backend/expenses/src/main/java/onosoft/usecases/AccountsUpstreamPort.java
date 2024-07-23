package onosoft.usecases;

import onosoft.domain.model.Account;

public interface AccountsUpstreamPort {

    public Account createAccount(String AccountNo, String Name, String description)
            throws DuplicateAccountNoException;

    // public List<Account> getAccounts();
}
