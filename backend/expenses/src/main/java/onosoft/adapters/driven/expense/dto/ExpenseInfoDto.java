package onosoft.adapters.driven.expense.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import onosoft.domain.model.PaymentStatus;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class ExpenseInfoDto extends ExpenseDto {
    @Size(max = 16)
    long expenseId;

    protected PaymentStatus paymentStatus;
}
