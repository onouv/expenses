package onosoft.adapters.driving.expense;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import onosoft.adapters.driving.account.AccountJpaData;
import onosoft.adapters.driving.commons.money.MoneyJpaData;
import onosoft.domain.model.ExpenseStatus;
import onosoft.domain.model.PaymentType;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import static org.hibernate.Length.LONG32;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Entity
@Table(name="expenses")
public class ExpenseJpaData {

    @Id
    @GeneratedValue
    @Column(name="expense_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_no")
    private AccountJpaData account;

    @Column(name = "recipient", length = 120)
    @Size(max = 120)
    private String recipient;

    @Column(name="purpose", length = 120)
    @Size(max = 120)
    private String purpose;

    @Embedded
    private MoneyJpaData amount;

    @Column(name="accrued_date", length = 10)
    @Size(max = 10)
    private String accruedDate;

    @Column(name="payment_target_date", length = 10)
    @Size(max = 10)
    private String paymentTargetDate;

    @Column(name="payment_actual_date", length = 10)
    @Size(max = 10)
    private String paymentActualDate;

    @Column(name="is_invoiced")
    private boolean isInvoiced;

    @Column(name="payment_type", length = LONG32)
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private PaymentType paymentType;

    @Column(name="expense_status", length = LONG32)
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private ExpenseStatus expenseStatus;

}
