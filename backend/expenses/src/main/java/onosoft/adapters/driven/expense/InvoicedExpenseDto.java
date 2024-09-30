package onosoft.adapters.driven.expense;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InvoicedExpenseDto extends PlannedExpenseDto {
    protected String invoiceUri;
}
