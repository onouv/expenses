package onosoft.adapters.driving.account;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.application.account.AccountDataMapper;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.account.AccountRepoPort;

import java.util.Optional;

@ApplicationScoped
public class AccountRepoAdapter implements AccountRepoPort {

    @Inject
    AccountDataMapper accountMapper;

    public boolean accountExists(String accountNo) {
        Optional<AccountData> dataOpt = find("accountNo", accountNo).stream().findFirst();
        return dataOpt.isPresent();
    }

    public Account findByAccountNo(String accountNo) throws NoSuchAccountException {
        Optional<AccountData> dataOpt = find("accountNo", accountNo).stream().findFirst();
        if (dataOpt.isPresent()) {
            return accountMapper.dataToDomain(dataOpt.get());
        }

        throw new NoSuchAccountException(accountNo);
    }

    public AccountData findDOByAccountNo(String accountNo) throws NoSuchAccountException {
        Optional<AccountData> dataOpt = find("accountNo", accountNo).stream().findFirst();
        if (dataOpt.isPresent()) {
            return dataOpt.get();
        }

        throw new NoSuchAccountException(accountNo);
    }
}
