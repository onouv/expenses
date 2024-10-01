package onosoft.adapters.driven.expense.dto;

import jakarta.validation.constraints.Size;
import lombok.*;
import onosoft.adapters.driven.expense.PaidExpenseDto;


@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaidExpenseResponseDto extends PaidExpenseDto {
    @Size(max = 16)
    long expenseId;
}
