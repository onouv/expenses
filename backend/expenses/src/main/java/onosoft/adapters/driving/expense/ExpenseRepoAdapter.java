package onosoft.adapters.driving.expense;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.ports.driven.expense.NoSuchExpenseException;
import onosoft.ports.driving.expense.ExpenseRepoPort;

@ApplicationScoped
public class ExpenseRepoAdapter implements ExpenseRepoPort {

    @Inject
    ExpenseRepo expenseRepo;

    @Override
    public void deleteExpense(long expenseId) throws NoSuchExpenseException {
        final boolean deleted = this.expenseRepo.deleteById(expenseId);

        if (!deleted) {
            throw new NoSuchExpenseException(expenseId);
        }
    }

    @Override
    public ExpenseJpaData loadExpense(long expenseId) throws NoSuchExpenseException {
        ExpenseJpaData data = expenseRepo.findById(expenseId);
        return data;
    }
}
