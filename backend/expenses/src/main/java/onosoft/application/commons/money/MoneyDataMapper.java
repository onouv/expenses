package onosoft.application.commons.money;

import jakarta.enterprise.context.ApplicationScoped;
import onosoft.domain.model.CappedMoney;
import onosoft.domain.model.Money;
import onosoft.ports.driving.commons.money.MoneyData;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
public class MoneyDataMapper {

    // as a business policy, we refuse to handle amounts larger than
    // this constant, for any currency.
    @ConfigProperty(name = "domain.money.max-value")
    protected long unitsLimit;

    public CappedMoney dataToDomain(MoneyData data) throws AmountExceedsRangeException {
        return new CappedMoney(
                data.getMicroUnits(),
                data.getCurrency(),
                unitsLimit);
    }

    public MoneyData domainToData(Money domain) {
        return new MoneyData(
                domain.getMicroUnits(),
                domain.getCurrency()
        );
    }

}
