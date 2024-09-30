package onosoft.adapters.driven.expense;

import jakarta.validation.constraints.Size;
import lombok.*;
import onosoft.adapters.driven.commons.money.MoneyDto;
import onosoft.domain.model.PaymentType;

import java.util.Date;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlannedExpenseDto {
        @Size(max = 16)
        protected String accountNo;
        protected String recipient;
        protected MoneyDto amount;

        @Size(max = 120)
        protected String purpose;
        protected Date accruedDate;
        protected Date paymentDate;
        protected boolean isInvoiced;
        PaymentType paymentType;
}
