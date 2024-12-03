package onosoft.application.commons.money;

import jakarta.enterprise.context.ApplicationScoped;
import onosoft.domain.model.CappedMoney;
import onosoft.domain.model.Money;
import onosoft.adapters.driving.commons.money.MoneyJpaData;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

@ApplicationScoped
public class MoneyDataMapper {

    static final Logger log = Logger.getLogger(MoneyDataMapper.class);

    // as a business policy, we refuse to handle amounts larger than
    // this constant, for any currency.
    @ConfigProperty(name = "domain.money.max-value")
    protected long unitsLimit;

    public CappedMoney dataToDomain(MoneyJpaData data) throws AmountExceedsRangeException {
        return new CappedMoney(
                data.getMicroUnits(),
                data.getCurrency(),
                unitsLimit);
    }

    public MoneyJpaData domainToData(Money domain) {
        return new MoneyJpaData(
                domain.getMicroUnits(),
                domain.getCurrency());
    }

}
