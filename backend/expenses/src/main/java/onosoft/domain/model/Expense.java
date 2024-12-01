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
    @NonNull private Date date;
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

    public void updateWith(Expense expense) {
        if (expense.getExpenseId() != this.expenseId) {
            throw new IllegalArgumentException("Expense id mismatch while while updating");
        }

        this.account = expense.getAccount();
        this.date = expense.getDate();
        this.recipient = expense.getRecipient();
        this.purpose = expense.getPurpose();
        this.amount = expense.getAmount();
        this.accruedDate = expense.getAccruedDate();
        this.paymentTargetDate = expense.getPaymentTargetDate();
        this.paymentActualDate = expense.getPaymentActualDate();
        this.isInvoiced = expense.isInvoiced();
        this.paymentType = expense.getPaymentType();
        this.paymentStatus = expense.getPaymentStatus();
    }
}
