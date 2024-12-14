package onosoft.adapters.driven.expense.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import lombok.experimental.SuperBuilder;
import onosoft.domain.model.ExpenseStatus;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class ExpenseEntityDto extends ExpenseDto {
    @Size(max = 16)
    long expenseId;

    @Size(max = 16)
    @NonNull
    protected String accountNo;

    boolean isInvoiced;
    protected ExpenseStatus expenseStatus;

    @JsonFormat(pattern="yyyy-MM-dd")
    protected String paymentActualDate;
}
