package onosoft.application.account;

import onosoft.application.expense.ExpenseDataMapper;
import onosoft.domain.model.Account;
import onosoft.ports.driving.account.AccountData;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "jakarta-cdi", uses= ExpenseDataMapper.class)
public interface AccountDataMapper {

    Account dataToDomain(AccountData entity);

    @InheritInverseConfiguration(name = "dataToDomain")
    AccountData domainToData(Account domain);

    List<Account> toDomainList(List<AccountData> dtoList);
}
