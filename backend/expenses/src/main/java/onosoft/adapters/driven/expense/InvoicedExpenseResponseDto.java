package onosoft.adapters.driven.expense;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InvoicedExpenseResponseDto extends InvoicedExpenseDto {
    @Size(max = 16)
    long expenseId;
}
