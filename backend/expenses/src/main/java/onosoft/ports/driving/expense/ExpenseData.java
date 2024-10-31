package onosoft.ports.driving.expense;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import onosoft.domain.model.PaymentStatus;
import onosoft.domain.model.PaymentType;
import onosoft.ports.driving.account.AccountData;
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
public class ExpenseData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="expense_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_account_no")
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

    @Column(name="expense_is_invoiced")
    private boolean invoiced;

    @Column(name="expense_payment_type", length = LONG32)
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private PaymentType paymentType;

    @NotNull
    @Column(name="expense_payment_status", length = LONG32)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

}
