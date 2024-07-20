package online.onosoft.application;

import jakarta.transaction.Transactional;
import online.onosoft.adapters.outbound.jpa.AccountData;
import online.onosoft.domain.model.Account;
import online.onosoft.domain.model.Expense;
import online.onosoft.usecases.ExpenseUsecases;
import online.onosoft.usecases.NoSuchAccountException;
import online.onosoft.usecases.PersistenceException;

import java.util.List;
import java.util.Optional;

public class ExpenseInputPort implements ExpenseUsecases {

    @Override
    @Transactional
    public void assignExpenseToAccount(Expense expense, String accountNo) throws NoSuchAccountException, PersistenceException {
        Optional<Account> account = AccountData.findByAccountNo(accountNo);

        if (account.isPresent()) {
            account.get().assignExpense(expense);
        }

        throw new NoSuchAccountException();
    }

    @Override
    public List<Expense> getExpenses(String accountNo) {

    }
}
