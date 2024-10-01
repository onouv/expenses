package onosoft.commons.money;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import onosoft.domain.exception.InvalidCurrencyException;
import onosoft.domain.model.Currency;


@Getter
public class Money {

    @AllArgsConstructor
    public static class Value {
        @Positive
        public long major;
        @Positive
        public int minor;

        public long toMicroUnits() {
            return major * Money.majorFactor + minor * Money.minorFactor;
        }
    }

    // microUnits/unit
    // 8500mu/(1000mu/u) = 8.50u
    @Positive
    private static final short scale = 1000;

    // as a business policy, we refuse to handle amounts larger than
    // this constant, for any currency.
    // TODO : this should be coded more explicit as a configurable
    //        business policy
    private static final long range = 100000;
    private static final long minorFactor = Money.scale / 100;
    private static final long majorFactor = Money.scale / 10;

    @Positive
    private long microUnits;



    @NotEmpty
    final Currency currency;

    /*
    public Money(@NonNull Currency currency) {
        this.microUnits = 0;
        this.currency = currency;
    }

     */


    public Money(@NonNull Value amount, @NonNull Currency currency) throws AmountExceedsRangeException {
        setValue(amount);
        this.currency = currency;
    }

    private Money(long uUnits, Currency currency) throws AmountExceedsRangeException {
        if (uUnits / scale > range ) {
            throw new AmountExceedsRangeException(this);
        }
        this.currency = currency;
    }

    public Money add(Money val) throws InvalidCurrencyException, AmountExceedsRangeException {
        if (! val.currency.equals(this.currency)) {
            throw new InvalidCurrencyException(val, this.currency);
        }
        final long result = val.microUnits + this.microUnits;

        return new Money(result, this.currency);
    }

    public Value getValue() {
        // given 105251 microunits of internal precision...
        // ...this should be 0.251
        final float decimals = ((microUnits / majorFactor) % 1);
        // this should be 25
        final int minors = Math.round((decimals * scale) / minorFactor);
        // ... and this should be 105
        final long majors = (microUnits - minors) / scale;

        // ...so this becomes { 105, 250 }, eq. 105.25 EUR
        return new Value(majors, minors);
    }

    public void setValue(Value amount) throws AmountExceedsRangeException {
        if (amount.major > range ) {
            Money m = new Money(amount, this.currency);
            throw new AmountExceedsRangeException(m);
        }
        microUnits = amount.toMicroUnits();
    }

    public String toString() {
        final Value amount = this.getValue();
        return String.format("%s.%s%s", amount.major, amount.minor, currency);
    }
}
