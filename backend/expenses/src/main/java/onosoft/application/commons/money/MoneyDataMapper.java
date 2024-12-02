package onosoft.application.commons.money;

import jakarta.enterprise.context.ApplicationScoped;
import onosoft.domain.model.CappedMoney;
import onosoft.domain.model.Money;
import onosoft.ports.driving.commons.money.MoneyData;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

@ApplicationScoped
public class MoneyDataMapper {

    static final Logger log = Logger.getLogger(MoneyDataMapper.class);

    // as a business policy, we refuse to handle amounts larger than
    // this constant, for any currency.
    @ConfigProperty(name = "domain.money.max-value")
    protected long unitsLimit;

    public CappedMoney dataToDomain(MoneyData data)  {
        final CappedMoney cappedMoney;
        try{
            // We must not deal with invalid data coming up from our own database
            cappedMoney = new CappedMoney(
                data.getMicroUnits(),
                data.getCurrency(),
                unitsLimit);
        } catch (MoneyException e) {
            log.error("Masking error of invalid money amount coming up from database: %s", e);
        }
    }

    public MoneyData domainToData(Money domain) {
        return new MoneyData(
                domain.getMicroUnits(),
                domain.getCurrency()
        );
    }

}
