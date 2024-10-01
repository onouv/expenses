package onosoft.adapters.driven.expense;

import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InvoicedExpenseResponseDto extends InvoicedExpenseDto {
    @Size(max = 16)
    long expenseId;
}
