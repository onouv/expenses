package onosoft.domain.model;


import jakarta.inject.Inject;
import jakarta.validation.constraints.Positive;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import onosoft.application.commons.money.AmountExceedsRangeException;
import onosoft.domain.services.MoneyConfigService;

@NoArgsConstructor(force = true)
public class CappedMoney extends Money {

    @Inject
    protected MoneyConfigService moneyConfig;

    protected final long uUnitsLimit;

    public CappedMoney(@NonNull Value amount, @NonNull Currency currency, long unitsLimit)
            throws AmountExceedsRangeException {
        super(amount, currency);
        this.uUnitsLimit = unitsLimit * scale;
        enforceLimit();
    }

    public CappedMoney(@Positive long uUnits, @NonNull Currency currency,  long unitsLimit)
            throws AmountExceedsRangeException {
        super(uUnits, currency);
        this.uUnitsLimit = unitsLimit * scale;
        enforceLimit();
    }

    protected void enforceLimit() throws AmountExceedsRangeException {
        if (this.microUnits > uUnitsLimit) {
            Money m = new Money(microUnits, this.currency);
            throw new AmountExceedsRangeException(m);
        }
    }
}
