package onosoft.application.account;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.AccountApiPort;
import onosoft.ports.driven.account.DuplicateAccountNoException;
import onosoft.ports.driving.account.AccountRepoPort;
import org.jboss.logging.Logger;

@ApplicationScoped
public class AccountsAppService implements AccountApiPort {

    private static final Logger log = Logger.getLogger(AccountsAppService.class);

    @Inject
    private AccountRepoPort accountRepo;

    @Override
    @Transactional
    public Account createAccount(String accountNo, String name, String description)
            throws DuplicateAccountNoException    {

        if (accountRepo.accountExists(accountNo)) {
            throw new DuplicateAccountNoException(accountNo);
        }

        Account account = Account.builder()
                .accountNo(accountNo)
                .accountName(name)
                .accountDescription(description)
                .build();

        accountRepo.saveAccount(account);

        log.infof("Created account %s", accountNo);

        return account;

    }
}
