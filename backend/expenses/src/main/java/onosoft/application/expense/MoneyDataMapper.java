package onosoft.application.expense;

import onosoft.commons.money.Money;
import onosoft.ports.driven.commons.money.MoneyDto;
import onosoft.ports.driving.commons.money.MoneyData;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "jakarta-cdi")
public interface MoneyDataMapper {

    MoneyDataMapper INSTANCE = Mappers.getMapper(MoneyDataMapper.class);

    Money dataToDomain(MoneyData data);
    @InheritInverseConfiguration(name = "dataToDomain")
    MoneyData domainToData(Money domain);

    List<Money> dataListToDomainList(List<MoneyData> dtoList);

    @InheritInverseConfiguration(name = "dataListToDomainList")
    List<MoneyData> domainListToDataList(List<Money> domain);

    Money dtoToDomain(MoneyDto dto);
    @InheritInverseConfiguration(name = "dtoToDomain")
    MoneyDto domainToDto(Money domain);

}
