package onosoft.adapters.driving.account;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import onosoft.application.account.AccountDataMapper;
import onosoft.application.expense.ExpenseDataMapper;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.account.AccountJpaData;
import onosoft.ports.driving.account.AccountRepoPort;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class AccountRepoAdapter implements AccountRepoPort {

    @Inject
    protected AccountPanacheRepo accountRepo;

    @Inject
    protected ExpenseDataMapper expenseDataMapper;

    @Inject
    protected AccountDataMapper accountDataMapper;

    @Override
    public Account loadAccount(String accountNo)
            throws NoSuchAccountException {
        Optional<AccountJpaData> opt = this.accountRepo
                .find("accountNo", accountNo)
                .stream()
                .findFirst();

        if (opt.isPresent()) {
            return this.accountDataMapper.dataToDomain(opt.get());
        }

        throw new NoSuchAccountException(accountNo);
    }

    @Override
    public List<Account> loadAllAccounts() {
        return this.accountRepo.listAll().stream().map((data) -> {
            return accountDataMapper.dataToDomain(data);
        }).toList();
    }

    public void saveAccount(Account account) {
        AccountJpaData dto = this.accountDataMapper.domainToData(account);
        this.accountRepo.persist(dto);
    }

    @Override
    public boolean accountExists(String accountNo) {
        return false;
    }

    @Override
    public void updateAccount(Account account) {
        AccountJpaData dto = this.accountDataMapper.domainToData(account);

        EntityManager em = this.accountRepo.getEntityManager();
        em.merge(dto);
    }
}
