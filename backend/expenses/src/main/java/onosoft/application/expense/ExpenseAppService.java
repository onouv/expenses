package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.adapters.driven.expense.dto.PlannedExpenseDto;
import onosoft.adapters.driven.expense.dto.PlannedExpenseResponseDto;
import onosoft.application.account.AccountDataMapper;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.model.*;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driven.expense.ExpenseApiPort;
import onosoft.ports.driving.account.AccountRepoPort;
import onosoft.ports.driving.expense.ExpenseRepoPort;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ExpenseAppService implements ExpenseApiPort {

    @ConfigProperty(name = "domain.money.max-value", defaultValue = "100000")
    protected long uUnitsLimit;

    @Inject
    AccountRepoPort accountRepo;

    @Inject
    ExpenseRepoPort expenseRepo;

    @Inject
    AccountDataMapper accountDataMapper;

    @Inject
    ExpenseApiMapper expenseApiMapper;

    @Transactional
    public PlannedExpenseResponseDto assignExpenseToAccount(PlannedExpenseDto dto)
            throws NoSuchAccountException, AmountExceedsRangeException {
        Account account = accountRepo.findByAccountNo(dto.getAccountNo());
        Expense expense = expenseApiMapper.fromPlannedExpenseDto(dto, account);

        account.addExpense(expense);
        accountRepo.persist(accountDataMapper.domainToData(account));

        return expenseApiMapper.toPlannedResponseDto(expense);
    }

    @Override
    public List<Expense> getExpenses(String accountNo) {
        return new ArrayList<Expense>();
    }
}
