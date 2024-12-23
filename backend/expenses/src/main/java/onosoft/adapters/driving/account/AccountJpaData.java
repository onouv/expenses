package onosoft.adapters.driving.account;

import jakarta.persistence.*;
import lombok.*;
import onosoft.adapters.driving.expense.ExpenseJpaData;

import java.util.List;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "accounts")
public class AccountJpaData {

    @Id
    @Column(name = "account_no", length = 16)
    private String accountNo;

    @Column(name = "account_name")
    private String accountName;

    @Column(name = "account_description")
    private String accountDescription;

    @OneToMany(
        mappedBy = "account",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private List<ExpenseJpaData> expenses;
}
