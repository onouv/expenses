package onosoft.application;

import onosoft.adapters.outbound.AccountRepository;
import onosoft.domain.model.Expense;
import onosoft.usecases.NoSuchAccountException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.domain.model.Account;
import onosoft.usecases.ExpenseUpstreamPort;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ExpenseAppService implements ExpenseUpstreamPort {

    @Inject
    AccountRepository repo;

    @Override
    @Transactional
    public void assignExpenseToAccount(Expense expense, String accountNo) throws NoSuchAccountException {
        Account account = repo.findByAccountNo(accountNo);
        account.assignExpense(expense);
    }

    @Override
    public List<Expense> getExpenses(String accountNo) {
        return new ArrayList<Expense>();
    }
}
