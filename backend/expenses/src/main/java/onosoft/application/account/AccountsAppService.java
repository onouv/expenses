package onosoft.application.account;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.AccountApiPort;
import onosoft.ports.driven.account.DuplicateAccountNoException;
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.account.AccountRepoPort;

@ApplicationScoped
public class AccountsAppService implements AccountApiPort {

    @Inject
    private AccountRepoPort accountRepo;

    @Inject
    private AccountDataMapper accountDataMapper;

    @Override
    @Transactional
    public Account createAccount(String accountNo, String name, String description)
            throws DuplicateAccountNoException, AmountExceedsRangeException
    {

        if (accountRepo.accountExists(accountNo)) {
            throw new DuplicateAccountNoException(accountNo);
        }

        try {
        Account account = Account.builder()
                .accountNo(accountNo)
                .accountName(name)
                .accountDescription(description)
                .build();

        AccountData data = accountDataMapper.domainToData(account);
        accountRepo.persist(data);


        return account;
        } catch (Exception x) {
            System.out.println("BANNNGG!!");
            return null;
        }
    }
}
