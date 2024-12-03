package onosoft.ports.driving.expense;

import jakarta.persistence.*;
import lombok.*;
import onosoft.domain.model.ExpenseStatus;
import onosoft.domain.model.PaymentType;
import onosoft.ports.driving.account.AccountJpaData;
import onosoft.ports.driving.commons.money.MoneyData;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.sql.Date;

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
    private String recipient;

    @Column(name="purpose", length = 120)
    private String purpose;

    @Embedded
    private MoneyData amount;

    @Column(name="accrued_date")
    private Date accruedDate;

    @Column(name="payment_target_date")
    private Date paymentTargetDate;

    @Column(name="payment_actual_date")
    private Date paymentActualDate;

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
