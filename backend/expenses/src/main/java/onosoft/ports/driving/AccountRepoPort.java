package onosoft.ports.driving;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;

public interface AccountRepoPort extends PanacheRepository<AccountData> {
    public boolean accountExists(String accountNo);
    public Account findByAccountNo(String accountNo) throws NoSuchAccountException;
    public AccountData findDOByAccountNo(String accountNo) throws NoSuchAccountException;
}
