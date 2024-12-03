package onosoft.adapters.driving.expense;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import onosoft.ports.driving.expense.ExpenseJpaData;

public interface ExpenseRepo extends PanacheRepository<ExpenseJpaData> {}

