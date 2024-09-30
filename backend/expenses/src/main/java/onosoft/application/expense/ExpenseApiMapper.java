package onosoft.application.expense;

import onosoft.adapters.driven.expense.ExpenseDto;
import onosoft.domain.model.Expense;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "jakarta-cdi")
public interface ExpenseApiMapper {
    ExpenseApiMapper INSTANCE = Mappers.getMapper(ExpenseApiMapper.class);

    Expense dtoToDomain(ExpenseDto dto);

    @InheritInverseConfiguration(name = "dtoToDomain")
    ExpenseDto domainToDto(Expense domain);

}
