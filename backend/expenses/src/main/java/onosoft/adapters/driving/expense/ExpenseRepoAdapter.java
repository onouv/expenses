package onosoft.adapters.driving.expense;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import onosoft.ports.driven.expense.NoSuchExpenseException;
import onosoft.ports.driving.expense.ExpenseRepoPort;

@ApplicationScoped
public class ExpenseRepoAdapter implements ExpenseRepoPort {

    @Inject
    ExpenseRepo expenseRepo;


    @Override
    public boolean expenseExists(long expenseId) {
        PanacheQuery<Long> query = expenseRepo.find("expenseId").project(Long.class);

        return query.count() > 0;
    }

    @Override
    public void deleteExpense(long expenseId) throws NoSuchExpenseException {
        if (! this.expenseRepo.deleteById(expenseId)) {
            throw new NoSuchExpenseException(expenseId);
        }
    }
}
