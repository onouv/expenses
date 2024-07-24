package onosoft.ports.driven.account;

import onosoft.domain.model.Account;

import java.util.List;

public interface AccountsUpstreamPort {

    public Account createAccount(String AccountNo, String Name, String description)
            throws DuplicateAccountNoException;

    public List<Account> getAccounts();
}
