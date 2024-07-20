package online.onosoft.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NonNull;

import java.util.Date;


@Entity
public class Expense {

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

    private double amount;

    private Date date;

    //private Receipt receipt;

}
