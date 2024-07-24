package onosoft.domain.model;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.ToString;
import onosoft.ports.expense.NegativeAmountException;

import java.time.Instant;
import java.util.Date;


@Data
@ToString
public class Expense {

    private String purpose;
    private double amount;
    private Date created;

    @NonNull
    private PaymentType paymentType;

    @NonNull
    private PaymentStatus paymentStatus;

    //private Receipt receipt;

    @Builder
    private Expense(
            String purpose,
            PaymentType paymentType,
            PaymentStatus paymentStatus,
            double amount
            )
            throws NegativeAmountException {

        this.purpose = purpose;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.created = Date.from(Instant.now());
        this.amount = amount;

        if (amount < 0) {
            throw new NegativeAmountException(this);
        }
    }

    public Expense(
            String purpose,
            PaymentType paymentType,
            double amount) {

        this.purpose = purpose;
        this.paymentType = paymentType;
        this.paymentStatus = PaymentStatus.Unknown;
        this.created = Date.from(Instant.now());
    }
}
