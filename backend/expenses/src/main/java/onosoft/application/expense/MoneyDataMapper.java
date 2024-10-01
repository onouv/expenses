package onosoft.application.expense;

import onosoft.commons.money.AmountExceedsRangeException;
import onosoft.commons.money.Money;
import onosoft.adapters.driven.commons.money.MoneyDto;
import onosoft.ports.driving.commons.money.MoneyData;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "jakarta-cdi")
public interface MoneyDataMapper extends MoneyApiMapper {

    MoneyDataMapper INSTANCE = Mappers.getMapper(MoneyDataMapper.class);

    @Mapping(target = "add", ignore = true)
    @Mapping(target = "value", ignore = true)
    @Mapping(target = "amount", ignore = true)
    Money dataToDomain(MoneyData data) throws AmountExceedsRangeException;
    @InheritInverseConfiguration(name = "dataToDomain")
    MoneyData domainToData(Money domain);

    List<Money> dataListToDomainList(List<MoneyData> dtoList);

    @InheritInverseConfiguration(name = "dataListToDomainList")
    List<MoneyData> domainListToDataList(List<Money> domain);

}
