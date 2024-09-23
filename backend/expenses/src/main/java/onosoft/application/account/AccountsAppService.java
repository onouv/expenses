package onosoft.application.account;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.AccountApiPort;
import onosoft.ports.driven.account.DuplicateAccountNoException;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.account.AccountRepoPort;

import java.util.List;

@ApplicationScoped
public class AccountsAppService implements AccountApiPort {

    @Inject
    private AccountRepoPort repo;

    @Inject
    private AccountDataMapper accountMapper;

    @Override
    @Transactional
    public Account createAccount(String accountNo, String name, String description) throws DuplicateAccountNoException {

        if (repo.accountExists(accountNo)) {
            throw new DuplicateAccountNoException(accountNo);
        }

        Account account = Account.builder()
                .accountNo(accountNo)
                .accountName(name)
                .accountDescription(description)
                .build();

        repo.persist(accountMapper.toData(account));

        return account;
    }

    @Override
    public List<Account> getAllAccounts() {
        List<AccountData> dtos = repo.listAll(Sort.by("account-no"));
        List<Account> accounts = accountMapper.toDomainList(dtos);

        return accounts;
    }

    @Override
    public Account getAccount(String accountNo) throws NoSuchAccountException {
        return this.repo.findByAccountNo(accountNo);
    }
}
