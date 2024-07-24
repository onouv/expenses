package onosoft.application.account;

import onosoft.adapters.outbound.AccountData;
import onosoft.domain.model.Account;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "jakarta-cdi")
public interface AccountMapper {

    Account toDomain(AccountData entity);

    @InheritInverseConfiguration(name = "toDomain")
    AccountData toData(Account domain);

    void updateEntityFromDomain(Account domain, @MappingTarget AccountData entity);
    void updateDomainFromEntity(AccountData entity, @MappingTarget Account domain);
}