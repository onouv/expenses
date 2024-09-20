package onosoft.adapters.driving;

import jakarta.persistence.*;
import lombok.*;
import onosoft.domain.model.PaymentStatus;
import onosoft.domain.model.PaymentType;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "expenses")
public class ExpenseData {

    @Id
    @GeneratedValue
    @Getter(AccessLevel.NONE)
    private long id;

    @Column(length = 125)
    private String purpose;

    @NonNull
    private PaymentType paymentType;

    @NonNull
    private PaymentStatus paymentStatus;

    @Builder
    public ExpenseData(String purpose, PaymentType paymentType, PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
        this.paymentType = paymentType;
        this.purpose = purpose;
    }
}
