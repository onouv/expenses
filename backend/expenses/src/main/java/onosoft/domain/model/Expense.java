package onosoft.domain.model;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

import java.sql.Date;


@Data
@ToString
@Builder
public class Expense {
    @NonNull private String accountNo;
    private long expenseId;
    @NonNull private String recipient;
    @NonNull private String purpose;
    @NonNull private CappedMoney amount;
    @NonNull private Date accruedDate;
    @NonNull private Date paymentDate;
    private boolean invoiced;
    private PaymentType paymentType;
    @NonNull private PaymentStatus paymentStatus;

    //private Receipt receipt;
}
