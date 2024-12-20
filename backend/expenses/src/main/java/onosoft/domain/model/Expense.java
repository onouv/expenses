package onosoft.domain.model;

import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.ToString;
import onosoft.adapters.driven.commons.FormattedDate;


@Data
@ToString
@Builder
public class Expense {
    long expenseId;

    @NonNull String accountNo;

    @NonNull
    @Size(max = 120)
    private String recipient;

    @NonNull
    @Size(max = 120)
    private String purpose;

    @NonNull
    private CappedMoney amount;

    @NonNull
    private FormattedDate accruedDate;

    private FormattedDate paymentTargetDate;
    private FormattedDate paymentActualDate;
    private boolean isInvoiced;
    private PaymentType paymentType;

    @NonNull
    private ExpenseStatus expenseStatus;

    //private Receipt receipt;

    public void updateWith(Expense update) {
        if (update.getExpenseId() != this.expenseId) {
            throw new IllegalArgumentException("Expense id mismatch while while updating");
        }

        //TODO 1
        // this.account = update.getAccount();
        this.recipient = update.getRecipient();
        this.purpose = update.getPurpose();
        this.amount = update.getAmount();
        this.accruedDate = update.getAccruedDate();
        this.paymentTargetDate = update.getPaymentTargetDate();
        this.paymentActualDate = update.getPaymentActualDate();
        this.paymentType = update.getPaymentType();
        this.isInvoiced = update.isInvoiced();
        this.expenseStatus = update.getExpenseStatus();
    }
}
