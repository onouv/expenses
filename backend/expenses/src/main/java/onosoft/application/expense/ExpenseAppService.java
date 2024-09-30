package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.adapters.driven.expense.PlannedExpenseResponseDto;
import onosoft.adapters.driving.account.AccountRepoAdapter;
import onosoft.application.account.AccountDataMapper;
import onosoft.commons.money.Money;
import onosoft.domain.model.*;
import onosoft.ports.driven.account.NoSuchAccountException;
import onosoft.ports.driven.expense.ExpenseApiPort;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ExpenseAppService implements ExpenseApiPort {

    @Inject
    AccountRepoAdapter repo;

    @Inject
    ExpenseApiMapper apiMapper;

    @Inject
    AccountDataMapper dataMapper;

    @Transactional
    public PlannedExpenseResponseDto assignExpenseToAccount(String accountNo, String purpose, Money value) throws NoSuchAccountException {
        Account account = repo.findByAccountNo(accountNo);

        Expense expense = Expense.builder()
                .amount(value)
                .paymentStatus(PaymentStatus.Planned)
                .paymentType(PaymentType.Unknown)
                .build();
        account.addExpense(expense);
        repo.persist(dataMapper.toData(account));

        return apiMapper.toPlannedResponseDto(expense);
    }

    @Override
    public List<Expense> getExpenses(String accountNo) {
        return new ArrayList<Expense>();
    }
}
