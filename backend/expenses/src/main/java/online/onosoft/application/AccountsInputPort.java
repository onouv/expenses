package online.onosoft.application;

import jakarta.transaction.Transactional;
import online.onosoft.adapters.outbound.jpa.AccountData;
import online.onosoft.domain.model.Account;
import online.onosoft.usecases.AccountsUsecases;
import online.onosoft.usecases.DuplicateAccountNoException;
import online.onosoft.usecases.PersistenceException;

import java.util.Optional;

public class AccountsInputPort implements AccountsUsecases {

    @Override
    @Transactional
    public Account createAccount(String accountNo, String name, String description)
            throws DuplicateAccountNoException, PersistenceException {
        Optional<Account> accountOpt = AccountData.findByAccountNo(accountNo);

        if (accountOpt.isEmpty()) {
            Account account = Account.builder()
                    .accountNo(accountNo)
                    .name(name)
                    .description(description)
                    .build();
            account.per

        }
    }
}
