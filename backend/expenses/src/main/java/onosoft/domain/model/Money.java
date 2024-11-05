package onosoft.domain.model;

import org.apache.commons.math3.util.Precision;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import onosoft.domain.exception.InvalidCurrencyException;


@Getter
@NoArgsConstructor(force = true)
public class Money {

    @AllArgsConstructor
    public static class Value {
        @Positive
        public long major;
        @Positive
        public int minor;

        public long toMicroUnits() {
            return major * scale + minor * Money.minorFactor;
        }
    }

    // microUnits/unit
    // 8500mu/(1000mu/u) = 8.50u
    @Positive
    protected static final short scale = 1000;

    private final int numMinorDigits = getNumDigits(scale/10);
    private int numTotalDigits;

    private static final long minorFactor = Money.scale / 100;
    private static final long majorFactor = Money.scale / 10;

    @Positive
    protected final long microUnits;

    @NotEmpty
    protected final Currency currency;

    public Money(@NonNull Value amount, @NonNull Currency currency) {
        this.microUnits = amount.toMicroUnits();
        this.currency = currency;
        this.numTotalDigits = getNumDigits(this.microUnits);
    }

    Money(@Positive long uUnits, Currency currency)  {
        this.microUnits = uUnits;
        this.currency = currency;
        this.numTotalDigits = getNumDigits(this.microUnits);
    }

    public Money add(Money val) throws InvalidCurrencyException {
        if (! val.currency.equals(this.currency)) {
            throw new InvalidCurrencyException(val, this.currency);
        }
        final long result = val.microUnits + this.microUnits;

        return new Money(result, this.currency);
    }

    public Value getValue() {
        // given 9,400,553 microunits of internal precision...

        // this should be 553 and should become 55, eventually
        final int minorMicros = this.getMinors();
        final double minordecs = (double) minorMicros / scale;
        final float mdcs = (float) Precision.round(minordecs * 100, 2);
        final int minorDecimals = Math.round(mdcs);

        // ... and this should be 9400
        final long majorDecimals = (this.microUnits - minorMicros) / scale;

        // ...so this becomes { 9400, 55 }, i.e. 9400.55 EUR
        return new Value(majorDecimals, minorDecimals);
    }

    public String toString() {
        final Value amount = this.getValue();
        return String.format("%s.%s%s", amount.major, amount.minor, currency);
    }

    protected int getNumDigits(long val) {
        return (int) Math.log10(val) + 1;
    }

    protected long removeLeftDigits(long val, int numLeftDigits) {
        return val % (long) Math.pow(10, getNumDigits(val) - numLeftDigits);
    }

    protected int getMinors() {
        return (int) removeLeftDigits(this.microUnits, numTotalDigits - numMinorDigits);
    }
}
