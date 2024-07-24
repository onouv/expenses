package onosoft.application.account;

import onosoft.adapters.driving.AccountRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.AccountsPort;
import onosoft.ports.driven.account.DuplicateAccountNoException;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class AccountsAppService implements AccountsPort {

    @Inject
    private AccountRepository repo;

    @Inject
    private AccountDataMapper accountMapper;

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

    @Override
    public List<Account> getAccounts() {
        return new ArrayList<>();
    }
}
