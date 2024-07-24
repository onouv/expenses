package onosoft.application.account;

import onosoft.ports.driving.AccountData;
import onosoft.domain.model.Account;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "jakarta-cdi")
public interface AccountDataMapper {

    Account toDomain(AccountData entity);

    @InheritInverseConfiguration(name = "toDomain")
    AccountData toData(Account domain);

    List<Account> toDomainList(List<AccountData> dtoList);

    @InheritInverseConfiguration(name = "toDomainList")
    List<AccountData> toData(List<Account> accounts);
}
