package onosoft.adapters.driving.account;

import io.quarkus.arc.WithCaching;
import jakarta.enterprise.inject.Instance;
import jakarta.inject.Inject;
import onosoft.application.account.AccountDataMapper;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.expense.ExpenseDataMapper;
import onosoft.domain.model.Account;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.account.AccountJpaData;
import onosoft.ports.driving.account.AccountRepoPort;
import onosoft.ports.driving.expense.ExpenseJpaData;

import java.util.List;
import java.util.Optional;


public class AccountRepoAdapter implements AccountRepoPort {

    @Inject
    @WithCaching
    protected Instance<AccountPanacheRepo> accountRepo;

    @Inject
    protected ExpenseDataMapper expenseDataMapper;

    @Inject
    protected AccountDataMapper accountDataMapper;

    protected AccountJpaData accountData;

    @Override
    public Account loadAccount(String accountNo)
            throws NoSuchAccountException, AmountExceedsRangeException {
        Optional<AccountJpaData> opt = this.accountRepo.get()
                .find("accountNo", accountNo)
                .stream()
                .findFirst();

        if (opt.isPresent()) {
            this.accountData = opt.get();
            return this.accountDataMapper.dataToDomain(this.accountData);
        }

        throw new NoSuchAccountException(accountNo);
    }

    public void saveAccount(Account account) {

    }

    public boolean accountExists(String accountNo) {
        return false;
    }

    protected void updateDataFromAccountDomainEntity(Account account) {
        this.accountData.setAccountDescription(account.getAccountDescription());
        this.accountData.setAccountName(account.getAccountName());
        final List<ExpenseJpaData> expenses = account.getExpenses()
                .stream()
                .map((expense -> expenseDataMapper.domainToData(expense, this.accountData)))
                .toList();
        this.accountData.setExpenses(expenses);
    }
}
