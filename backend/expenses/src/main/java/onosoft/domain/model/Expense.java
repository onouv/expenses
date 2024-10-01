package onosoft.domain.model;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.ToString;
import onosoft.commons.money.Money;
import java.sql.Date;


@Data
@ToString
@Builder
public class Expense {
    private String accountNo;
    private long expenseId;
    private String recipient;
    private String purpose;
    private Money amount;
    private Date accruedDate;
    private Date paymentDate;
    private boolean isInvoiced;

    @NonNull
    private PaymentType paymentType;

    @NonNull
    private PaymentStatus paymentStatus;

    //private Receipt receipt;
}
