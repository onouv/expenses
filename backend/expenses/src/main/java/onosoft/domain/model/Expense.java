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
    private long expenseId;
    @NonNull private Account account;

    @NonNull
    @Size(max = 120)
    String recipient;

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

    public void updateWith(Expense expense) {
        if (expense.getExpenseId() != this.expenseId) {
            throw new IllegalArgumentException("Expense id mismatch while while updating");
        }

        this.account = expense.getAccount();
        this.recipient = expense.getRecipient();
        this.purpose = expense.getPurpose();
        this.amount = expense.getAmount();
        this.accruedDate = expense.getAccruedDate();
        this.paymentTargetDate = expense.getPaymentTargetDate();
        this.paymentActualDate = expense.getPaymentActualDate();
        this.paymentType = expense.getPaymentType();
        this.isInvoiced = expense.isInvoiced();
        this.expenseStatus = expense.getExpenseStatus();
    }
}
