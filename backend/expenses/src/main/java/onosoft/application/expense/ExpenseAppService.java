package onosoft.application.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import onosoft.adapters.driving.AccountRepoAdapter;
import onosoft.domain.model.Account;
import onosoft.domain.model.Expense;
import onosoft.ports.driven.account.NoSuchAccountException;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ExpenseAppService implements onosoft.ports.expense.ExpenseApiPort {

    @Inject
    AccountRepoAdapter repo;

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
