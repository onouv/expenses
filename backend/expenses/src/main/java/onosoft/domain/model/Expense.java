package onosoft.domain.model;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.ToString;
import onosoft.commons.money.Money;
import onosoft.ports.driven.expense.NegativeAmountException;

import java.time.Instant;
import java.util.Date;


@Data
@ToString
public class Expense {

    private String purpose;
    private Money amount;
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
            Money amount
            )
            throws NegativeAmountException {

        this.purpose = purpose;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.created = Date.from(Instant.now());
        this.amount = amount;
    }

    public Expense(
            String purpose,
            PaymentType paymentType,
            double amount) {

        this.purpose = purpose;
        this.paymentType = paymentType;
        this.paymentStatus = PaymentStatus.Planned;
        this.created = Date.from(Instant.now());
    }
}
