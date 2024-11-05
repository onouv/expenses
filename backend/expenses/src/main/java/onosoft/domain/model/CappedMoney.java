package onosoft.domain.model;



import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import net.bytebuddy.implementation.bind.annotation.Default;
import onosoft.application.commons.money.AmountExceedsRangeException;

@NoArgsConstructor(force = true)
public class CappedMoney extends Money {

    // as a business policy, we refuse to handle amounts larger than
    // this constant, for any currency.
    private final long uUnitsLimit;

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