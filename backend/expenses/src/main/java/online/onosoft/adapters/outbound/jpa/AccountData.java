package online.onosoft.adapters.outbound.jpa;

import io.quarkus.arc.All;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import lombok.*;
import online.onosoft.domain.model.Account;
import online.onosoft.domain.model.Expense;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "accounts")
public class AccountData extends PanacheEntity {

    @Id
    //@Column(length = 25)
    private String accountNo;

    @Column(length = 35)
    private String name;

    @Column(length = 125)
    private String description;

    @OneToMany
    private List<ExpenseData> expenses;

    public static AccountData of(Account account) {
        return AccountData.builder()
                .accountNo(account.getAccountNo())
                .name(account.getName())
                .description(account.getDescription())
    }
    public static Optional<Account> findByAccountNo(String accountNo) {
        Optional<AccountData> account = findByIdOptional(accountNo);

        if (account.isPresent()) {
            return Optional.ofNullable(Account.builder()
                    .accountNo(accountNo)
                    .build());
        }

        return Optional.empty();
    }


}
