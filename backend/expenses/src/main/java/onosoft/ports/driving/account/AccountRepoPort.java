package onosoft.ports.driving.account;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.account.AccountData;

public interface AccountRepoPort extends PanacheRepository<AccountData> {
    boolean accountExists(String accountNo);

    Account findByAccountNo(String accountNo) throws NoSuchAccountException;

    AccountData findDOByAccountNo(String accountNo) throws NoSuchAccountException;
}
