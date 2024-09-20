package onosoft.ports.driven.account;

import onosoft.domain.model.Account;

import java.util.List;

public interface AccountApiPort {

    Account createAccount(String AccountNo, String Name, String description)
            throws DuplicateAccountNoException;

    List<Account> getAllAccounts();

    Account getAccount(String accountNo) throws NoSuchAccountException;
}
