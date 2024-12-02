package onosoft.adapters.driving.account;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import onosoft.ports.driving.account.AccountJpaData;


public interface AccountPanacheRepo extends PanacheRepository<AccountJpaData> {}
