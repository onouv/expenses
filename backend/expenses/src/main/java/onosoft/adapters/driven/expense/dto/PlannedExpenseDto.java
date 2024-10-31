package onosoft.adapters.driven.expense.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.SuperBuilder;
import onosoft.domain.model.PaymentType;

import java.sql.Date;

@Data
@Getter
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PlannedExpenseDto extends ExpenseDto {
        @Size(max = 16)
        @NonNull
        protected String accountNo;

        @JsonFormat(pattern="yyyy-MM-dd")
        @NonNull
        protected Date paymentDate;

        protected PaymentType paymentType;

        protected boolean isInvoiced;
}
