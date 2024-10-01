package onosoft.adapters.driven.expense.dto;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;
import onosoft.adapters.driven.expense.dto.PlannedExpenseDto;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class PlannedExpenseResponseDto extends PlannedExpenseDto {
    @Size(max = 16)
    long expenseId;
}
