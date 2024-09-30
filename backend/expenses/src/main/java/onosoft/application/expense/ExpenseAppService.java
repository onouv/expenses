package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.adapters.driving.account.AccountRepoAdapter;
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

    @Transactional
    public void assignExpenseToAccount(String accountNo, String purpose, Money value) throws NoSuchAccountException {
        Account account = repo.findByAccountNo(accountNo);

        Expense expense = Expense.builder()
                .amount(value)
                .paymentStatus(PaymentStatus.Planned)
                .paymentType(PaymentType.Unknown)
                .build();
        account.addExpense(expense);
    }

    @Override
    public List<Expense> getExpenses(String accountNo) {
        return new ArrayList<Expense>();
    }
}
