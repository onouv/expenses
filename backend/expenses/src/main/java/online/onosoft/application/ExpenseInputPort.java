package online.onosoft.application;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import online.onosoft.adapters.outbound.AccountRepository;
import online.onosoft.domain.model.Account;
import online.onosoft.domain.model.Expense;
import online.onosoft.usecases.ExpenseUsecases;
import online.onosoft.usecases.NoSuchAccountException;
import online.onosoft.usecases.PersistenceException;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ExpenseInputPort implements ExpenseUsecases {

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
