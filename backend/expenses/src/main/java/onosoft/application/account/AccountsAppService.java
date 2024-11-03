package onosoft.application.account;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.adapters.driven.expense.dto.PlannedExpenseDto;
import onosoft.adapters.driven.expense.dto.PlannedExpenseResponseDto;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.application.expense.ExpenseApiMapper;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.AccountApiPort;
import onosoft.ports.driven.account.DuplicateAccountNoException;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.account.AccountRepoPort;

import java.util.List;

@ApplicationScoped
public class AccountsAppService implements AccountApiPort {

    @Inject
    private AccountRepoPort accountRepo;

    @Inject
    private AccountDataMapper accountMapper;

    @Override
    @Transactional
    public Account createAccount(String accountNo, String name, String description) throws DuplicateAccountNoException {

        if (accountRepo.accountExists(accountNo)) {
            throw new DuplicateAccountNoException(accountNo);
        }

        try {
        Account account = Account.builder()
                .accountNo(accountNo)
                .accountName(name)
                .accountDescription(description)
                .build();

        accountRepo.persist(accountMapper.domainToData(account));

        return account;
        } catch (Exception x) {
            System.out.println("BANNNGG!!");
            return null;
        }
    }

    @Override
    public List<Account> getAllAccounts() {
        List<AccountData> dtos = accountRepo.listAll(Sort.by("account-no"));
        List<Account> accounts = accountMapper.toDomainList(dtos);

        return accounts;
    }

    @Override
    public Account getAccount(String accountNo) throws NoSuchAccountException {
        return accountRepo.findByAccountNo(accountNo);
    }
}
