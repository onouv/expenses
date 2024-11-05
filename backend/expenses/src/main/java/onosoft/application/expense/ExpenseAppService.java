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
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.account.AccountRepoPort;
import onosoft.ports.driving.expense.ExpenseData;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ExpenseAppService implements ExpenseApiPort {

    @Inject
    AccountRepoPort accountRepo;

    @Inject
    AccountDataMapper accountDataMapper;

    @Inject
    ExpenseApiMapper expenseApiMapper;
    @Inject
    ExpenseDataMapper expenseDataMapper;

    @Transactional
    public PlannedExpenseResponseDto assignExpenseToAccount(PlannedExpenseDto dto)
            throws NoSuchAccountException, AmountExceedsRangeException {

        // TODO : work the domain entity rather than directly with the data entity
        // but that creates a Hibernate exception, because the data entity (DO) generated after
        // manipulating the domain entity is a different instance from the one read
        AccountData accountData = accountRepo.findDOByAccountNo(dto.getAccountNo());
        Account account = accountDataMapper.dataToDomain(accountData);
        Expense expense = expenseApiMapper.fromPlannedExpenseDto(dto, account);
        ExpenseData expenseData = expenseDataMapper.domainToData(expense, accountData);
        List<ExpenseData> expenses = accountData.getExpenses();
        expenses.add(expenseData);
        accountRepo.persist(accountData);

        // this more logical code creates the exception
        //account.addExpense(expense);
        //accountRepo.persist(accountDataMapper.domainToData(account));

        return expenseApiMapper.toPlannedResponseDto(expense);
    }

    @Override
    public List<Expense> getExpenses(String accountNo) {
        return new ArrayList<Expense>();
    }
}
