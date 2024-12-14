package onosoft.adapters.driven.expense.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;
import onosoft.adapters.driven.commons.money.MoneyDto;
import onosoft.domain.model.PaymentType;

@Getter
@EqualsAndHashCode
@NoArgsConstructor
@ToString
@SuperBuilder
public class ExpenseDto {
    @NonNull
    @Size(max = 120)
    protected String recipient;

    @NonNull
    @Size(max = 120)
    protected String purpose;

    @NonNull
    protected MoneyDto amount;

    @NonNull
    @JsonFormat(pattern="yyyy-MM-dd")
    protected String accruedDate;

    @Builder.Default
    protected final PaymentType paymentType = PaymentType.Unknown;

    @JsonFormat(pattern="yyyy-MM-dd")
    protected String paymentTargetDate;

    protected boolean isInvoiced;
}
