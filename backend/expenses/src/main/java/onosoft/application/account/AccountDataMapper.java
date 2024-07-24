package onosoft.application.account;

import onosoft.ports.driving.AccountData;
import onosoft.domain.model.Account;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "jakarta-cdi")
public interface AccountDataMapper {

    Account toDomain(AccountData entity);

    @InheritInverseConfiguration(name = "toDomain")
    AccountData toData(Account domain);

    void updateEntityFromDomain(Account domain, @MappingTarget AccountData entity);
    void updateDomainFromEntity(AccountData entity, @MappingTarget Account domain);
}
