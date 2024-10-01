package onosoft.adapters.driven.expense.dto;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;
import onosoft.adapters.driven.commons.money.MoneyDto;

import java.sql.Date;

@Data
@EqualsAndHashCode
@SuperBuilder
public class ExpenseDto {

    @Size(max = 120)
    protected String recipient;

    @Size(max = 120)
    protected String purpose;

    protected MoneyDto amount;
    protected Date accruedDate;


}
