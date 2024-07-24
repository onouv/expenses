package onosoft.application.account;

import onosoft.adapters.outbound.AccountRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.domain.model.Account;
import onosoft.ports.account.AccountsUpstreamPort;
import onosoft.ports.account.DuplicateAccountNoException;

@ApplicationScoped
public class AccountsAppService implements AccountsUpstreamPort {

    @Inject
    private AccountRepository repo;

    @Inject
    private AccountMapper accountMapper;

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
