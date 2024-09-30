package onosoft.application.account;

import onosoft.application.expense.ExpenseDataMapper;
import onosoft.domain.model.Account;
import onosoft.ports.driving.account.AccountData;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "jakarta-cdi", uses= ExpenseDataMapper.class)
public interface AccountDataMapper {

    Account toDomain(AccountData entity);

    @InheritInverseConfiguration(name = "toDomain")
    AccountData toData(Account domain);

    List<Account> toDomainList(List<AccountData> dtoList);

    @InheritInverseConfiguration(name = "toDomainList")
    List<AccountData> toData(List<Account> accounts);
}
