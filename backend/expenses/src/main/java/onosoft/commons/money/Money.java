package onosoft.commons.money;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NonNull;
import onosoft.domain.exception.InvalidCurrencyException;
import onosoft.domain.model.Currency;


@Getter
public class Money {
    @Positive
    private long microUnits;

    // microUnits/unit
    // 8500mu/(1000mu/u) = 8.50u
    @Positive
    private final short scale = 1000;

    @NotEmpty
    final Currency currency;

    public Money(@Positive long amount, @NonNull Currency currency) {

        if (amount > Long.MAX_VALUE/scale ) {
            throw new ArithmeticException("value exceeds maximum range.");
        }

        this.microUnits = amount * scale;
        this.currency = currency;
    }

    public Money add(Money val) throws InvalidCurrencyException {
        if (! val.currency.equals(this.currency)) {
            throw new InvalidCurrencyException(val, this.currency);
        }

        final long result = val.microUnits + this.microUnits;
        if (result > Long.MAX_VALUE - 1 ) {
            throw new ArithmeticException("operation result exceeds maximum range.");
        }

        return new Money(result, this.currency);
    }

    public long amount() {
        return this.microUnits/scale;
    }

    public String toString() {
        return String.format("%s %s", this.amount());
    }

}
