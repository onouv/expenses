package onosoft.application.account;

import onosoft.adapters.driven.account.AccountDto;
import onosoft.domain.model.Account;
import onosoft.ports.driving.AccountData;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "jakarta-cdi")
public interface AccountApiMapper {
    Account dtoToDomain(AccountDto dto);

    @InheritInverseConfiguration(name = "dtoToDomain")
    AccountDto domainToDto(Account domain);

    List<Account> dtoListToDomainList(List<AccountDto> dto);

    @InheritInverseConfiguration(name = "dtoListToDomainList")
    List<AccountDto> domainListToDtoList(List<Account> domain);

    AccountDto dtoFromDO(AccountData dO);
    List<AccountDto> dtoListFromDOList(List<AccountData> dataList);

}
