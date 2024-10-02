package onosoft.ports.driving.expense;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import onosoft.domain.model.PaymentStatus;
import onosoft.domain.model.PaymentType;
import onosoft.ports.driving.account.AccountData;
import onosoft.ports.driving.commons.money.MoneyData;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import org.hibernate.validator.constraints.Length;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Entity
@Table(name="expenses")
public class ExpenseData {

    @Id
    @GeneratedValue
    @Column(name="expense_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private AccountData account;

    @Column(name = "expense_recipient", length = 120)
    private String recipient;

    @Column(name="expense_purpose", length = 120)
    private String purpose;

    @Embedded
    private MoneyData amount;

    @Column(name="expense_accrued_date")
    private Date accruedDate;

    @Column(name="expense_payment_date")
    private Date paymentDate;
    private boolean isInvoiced;

    @NotEmpty
    @NonNull
    @Length(max=32)
    @Column(name="expense_payment_type", length = 32)
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private PaymentType paymentType;

    @NotEmpty
    @NonNull
    @Length(max=32)
    @Column(name="expense_payment_status", length = 32)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;


}
