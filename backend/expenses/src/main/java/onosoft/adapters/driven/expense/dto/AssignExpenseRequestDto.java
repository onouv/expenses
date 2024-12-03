package onosoft.adapters.driven.expense.dto;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@Getter
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AssignExpenseRequestDto extends ExpenseDto {
        @Size(max = 16)
        @NonNull
        protected String accountNo;



}
