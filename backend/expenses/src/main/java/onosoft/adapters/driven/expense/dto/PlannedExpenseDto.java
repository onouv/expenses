package onosoft.adapters.driven.expense.dto;

import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import onosoft.domain.model.PaymentType;

import java.sql.Date;

@Data
@Getter
@SuperBuilder
public class PlannedExpenseDto extends ExpenseDto {
        @Size(max = 16)
        protected String accountNo;
        protected Date paymentDate;
        protected PaymentType paymentType;
        protected boolean isInvoiced;
}
