package online.onosoft.application;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import online.onosoft.adapters.outbound.AccountRepository;
import online.onosoft.domain.model.Account;
import online.onosoft.usecases.AccountsUsecases;
import online.onosoft.usecases.DuplicateAccountNoException;

@ApplicationScoped
public class AccountsInputPort implements AccountsUsecases {

    @Inject
    AccountRepository repo;

    AccountMapper accountMapper;

    @Override
    @Transactional
    public Account createAccount(String accountNo, String name, String description)
            throws DuplicateAccountNoException {

        if (repo.accountExists(accountNo)) {
            throw new DuplicateAccountNoException(accountNo);
        }

        Account account = Account.builder()
                .accountNo(accountNo)
                .name(name)
                .description(description)
                .build();
        repo.persist(accountMapper.toData(account));

        return account;
    }
}
