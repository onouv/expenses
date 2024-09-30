package onosoft.application.expense;

import onosoft.adapters.driven.expense.InvoicedExpenseResponseDto;
import onosoft.adapters.driven.expense.PaidExpenseResponseDto;
import onosoft.adapters.driven.expense.PlannedExpenseResponseDto;
import onosoft.domain.model.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "jakarta-cdi")
public interface ExpenseApiMapper {
    ExpenseApiMapper INSTANCE = Mappers.getMapper(ExpenseApiMapper.class);

    PlannedExpenseResponseDto toPlannedResponseDto(Expense domain);

    InvoicedExpenseResponseDto toInvoicedResponseDto(Expense domain);

    PaidExpenseResponseDto toPaidResponseDto(Expense domain);

}
