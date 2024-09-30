package onosoft.application.expense;

import onosoft.adapters.driven.expense.ExpenseDto;
import onosoft.domain.model.Expense;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta-cdi", uses = MoneyDataMapper.class)
public interface ExpenseApiMapper {
    Expense dtoToDomain(ExpenseDto dto);

    @InheritInverseConfiguration(name = "dtoToDomain")
    ExpenseDto domainToDto(Expense domain);

}
