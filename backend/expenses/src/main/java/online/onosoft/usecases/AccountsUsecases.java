package online.onosoft.usecases;

import online.onosoft.domain.model.Account;

public interface AccountsUsecases {

    public Account createAccount(String AccountNo, String Name, String description)
            throws DuplicateAccountNoException, PersistenceException;
}
