package onosoft.application.expense;

import onosoft.adapters.driven.commons.money.MoneyDto;
import onosoft.commons.money.Money;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "jakarta-cdi")
public interface MoneyApiMapper {

    MoneyApiMapper INSTANCE = Mappers.getMapper(MoneyApiMapper.class);

    Money dtoToDomain(MoneyDto dto);

    @InheritInverseConfiguration(name = "dtoToDomain")
    MoneyDto domainToDto(Money domain);
}
