package onosoft.adapters.driving;

import onosoft.application.account.AccountDataMapper;
import onosoft.ports.driven.account.NoSuchAccountException;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import onosoft.domain.model.Account;
import onosoft.ports.driving.AccountData;
import onosoft.ports.driving.AccountRepoPort;

import java.util.Optional;

@ApplicationScoped
public class AccountRepoAdapter implements AccountRepoPort {

    AccountDataMapper accountMapper;

    public boolean accountExists(String accountNo) {
        Optional<AccountData> dataOpt = find("accountNo", accountNo).stream().findFirst();
        if(dataOpt.isPresent()) {
            return true;
        }

        return false;
    }

    public Account findByAccountNo(String accountNo) throws NoSuchAccountException {
        Optional<AccountData> dataOpt = find("accountNo", accountNo).stream().findFirst();
        if(dataOpt.isPresent()) {
            return accountMapper.toDomain(dataOpt.get());
        }

        throw new NoSuchAccountException(accountNo);
    }

    public AccountData findDOByAccountNo(String accountNo) throws NoSuchAccountException {
        Optional<AccountData> dataOpt = find("accountNo", accountNo).stream().findFirst();
        if(dataOpt.isPresent()) {
            return dataOpt.get();
        }

        throw new NoSuchAccountException(accountNo);
    }
}
