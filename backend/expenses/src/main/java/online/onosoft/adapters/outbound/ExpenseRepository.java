package online.onosoft.adapters.outbound;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ExpenseRepository implements PanacheRepository<ExpenseData> {
}
