package onosoft.adapters.driving.expense;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import onosoft.ports.driving.expense.ExpenseData;

@ApplicationScoped
public class ExpenseRepoAdapter implements PanacheRepository<ExpenseData> {}
