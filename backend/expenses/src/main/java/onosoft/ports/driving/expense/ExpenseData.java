package onosoft.ports.driving.expense;

import jakarta.persistence.*;
import lombok.*;
import onosoft.domain.model.PaymentStatus;
import onosoft.domain.model.PaymentType;
import onosoft.ports.driving.account.AccountData;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.Type;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="expenses")
public class ExpenseData {

    @Id
    @GeneratedValue
    @Column(name="expense_id")
    @Getter(AccessLevel.NONE)
    private long id;

    @Column(name="expense_purpose", length=120)
    private String purpose;

    @NonNull
    @Length(max=32)
    @Column(name="expense_payment_type", length=32)
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private PaymentType paymentType;

    @NonNull
    @Length(max=32)
    @Column(name="expense_payment_status", length=32)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private AccountData account;

    @Builder
    public ExpenseData(String purpose, PaymentType paymentType, PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
        this.paymentType = paymentType;
        this.purpose = purpose;
    }
}
