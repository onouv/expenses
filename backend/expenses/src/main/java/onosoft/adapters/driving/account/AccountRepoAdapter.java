package onosoft.adapters.driving.account;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import onosoft.adapters.driving.PersistencyAdapterException;
import onosoft.application.account.AccountDataMapper;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.expense.ExpenseDataMapper;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.account.AccountJpaData;
import onosoft.ports.driving.account.AccountRepoPort;

import java.util.ArrayList;
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
            throws NoSuchAccountException, AmountExceedsRangeException {
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
    public List<Account> loadAllAccounts() throws AmountExceedsRangeException {
        final List<AccountJpaData> accounts = this.accountRepo.listAll();
        final List<Account> result = new ArrayList<>();

        for (AccountJpaData account : accounts) {
            result.add(this.accountDataMapper.dataToDomain(account));
        }

        return result;
    }

    public void saveAccount(Account account) {
        AccountJpaData dto = this.accountDataMapper.domainToData(account);
        this.accountRepo.persist(dto);
    }

    @Override
    public boolean accountExists(String accountNo) {
        PanacheQuery<AccountJpaData> query = this.accountRepo.find("accountNo", accountNo);
        return query.count() > 0;
    }

    @Override
    public void updateAccount(Account account) {
        AccountJpaData dto = this.accountDataMapper.domainToData(account);

        EntityManager em = this.accountRepo.getEntityManager();
        try {
            em.merge(dto);
        } catch (PersistenceException | IllegalArgumentException e) {
            throw new PersistencyAdapterException(e.getMessage());
        }
    }
}
