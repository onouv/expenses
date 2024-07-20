package online.onosoft.domain.model;


import jakarta.persistence.Column;
import lombok.*;
import org.hibernate.boot.jaxb.cfg.spi.JaxbCfgCollectionCacheType;


import java.util.List;

@Getter
@Setter
@Builder
//@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Account {

    private String accountNo;
    private List<Expense> expenses;
    private String name;
    private String description;

    public void assignExpense(Expense expense) {
        this.expenses.add(expense);
    }
}
