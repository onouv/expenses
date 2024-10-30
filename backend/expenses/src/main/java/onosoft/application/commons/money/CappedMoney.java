package onosoft.application.commons.money;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.constraints.Positive;
import lombok.NonNull;
import onosoft.domain.model.Currency;
import onosoft.domain.model.DomainConfig;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
public class CappedMoney extends Money {

    // as a business policy, we refuse to handle amounts larger than
    // this constant, for any currency.
    @ConfigProperty(name = "domain.money.max-value")
    protected long uUnitsLimit;



    public CappedMoney(@NonNull Value amount, @NonNull Currency currency) throws AmountExceedsRangeException {
        super(amount, currency);
        enforceLimit();
    }

    public CappedMoney(@Positive long uUnits, @NonNull Currency currency) throws AmountExceedsRangeException {
        super(uUnits, currency);
        enforceLimit();
    }

    protected void enforceLimit() throws AmountExceedsRangeException {
        if (this.microUnits > uUnitsLimit) {
            Money m = new Money(microUnits, this.currency);
            throw new AmountExceedsRangeException(m);
        }
    }
}
