package onosoft.ports.driving.account;

import jakarta.persistence.*;
import lombok.*;
import onosoft.ports.driving.expense.ExpenseData;

import java.util.List;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "accounts")
public class AccountData {

    @Id
    @Column(name = "account_no", length = 16)
    private String accountNo;

    @Column(name = "account_name")
    private String accountName;

    @Column(name = "account_description")
    private String accountDescription;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExpenseData> expenses;
}
