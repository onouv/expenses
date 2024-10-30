package onosoft.adapters.driven.expense.dto;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;
import onosoft.adapters.driven.commons.money.MoneyDto;

import java.sql.Date;

@Data
@EqualsAndHashCode
@SuperBuilder
@NoArgsConstructor
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
    protected Date accruedDate;


}
