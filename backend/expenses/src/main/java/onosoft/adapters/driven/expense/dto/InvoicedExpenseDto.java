package onosoft.adapters.driven.expense.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import onosoft.adapters.driven.expense.dto.PlannedExpenseDto;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class InvoicedExpenseDto extends PlannedExpenseDto {
    protected String invoiceUri;
}
