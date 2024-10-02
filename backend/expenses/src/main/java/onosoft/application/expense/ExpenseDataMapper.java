package onosoft.application.expense;

import onosoft.commons.money.MoneyDataMapper;
import onosoft.domain.model.Expense;
import onosoft.ports.driving.expense.ExpenseData;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "jakarta-cdi", uses = MoneyDataMapper.class)
public interface ExpenseDataMapper {
    ExpenseDataMapper instance = Mappers.getMapper(ExpenseDataMapper.class);

    Expense dataToDomain(ExpenseData data);

    @InheritInverseConfiguration(name = "dataToDomain")
    ExpenseData domainToData(Expense domain);
}
