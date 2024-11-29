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
    @NonNull private Account account;
    private long expenseId;
    @NonNull private String recipient;
    @NonNull private String purpose;
    @NonNull private CappedMoney amount;
    @NonNull private Date accruedDate;
    private Date paymentTargetDate;
    private Date paymentActualDate;
    private boolean isInvoiced;
    private PaymentType paymentType;
    @NonNull private ExpenseStatus paymentStatus;

    //private Receipt receipt;
}
