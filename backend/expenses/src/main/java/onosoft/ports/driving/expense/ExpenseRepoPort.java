package onosoft.ports.driving.expense;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import onosoft.domain.model.Expense;

public interface ExpenseRepoPort extends PanacheRepository<ExpenseData> {}
