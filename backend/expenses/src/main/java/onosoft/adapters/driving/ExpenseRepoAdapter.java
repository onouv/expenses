package onosoft.adapters.driving;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ExpenseRepoAdapter implements PanacheRepository<ExpenseData> {
}
